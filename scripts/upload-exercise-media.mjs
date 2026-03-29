/**
 * Busca imágenes/GIFs para ejercicios sin media en ExerciseDB API,
 * las descarga y sube a Supabase Storage bucket "exercise-media".
 *
 * Requiere:
 *   SUPABASE_URL       = https://<project>.supabase.co
 *   SUPABASE_SERVICE_KEY = <service_role key>  (Settings > API)
 *
 * Run: node scripts/upload-exercise-media.mjs
 */

import { createClient } from '@supabase/supabase-js';

// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://bqqpfldwzkfdvlvfjkbr.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? '';

const RAPIDAPI_KEY  = '0f202c21fdmsh3d9821aa1978fa0p121377jsn0d84c415f2fe';
const RAPIDAPI_HOST = 'exercisedb.p.rapidapi.com';
const API_URL       = `https://${RAPIDAPI_HOST}/exercises/name`;

const BUCKET = 'exercise-media';
const sleep  = (ms) => new Promise(r => setTimeout(r, ms));

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Busca un ejercicio en ExerciseDB por nombre, devuelve el primer resultado */
async function searchExercise(nameEn) {
  const url = `${API_URL}/${encodeURIComponent(nameEn.toLowerCase())}?limit=5&offset=0`;
  const res = await fetch(url, {
    headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': RAPIDAPI_HOST },
  });
  if (!res.ok) throw new Error(`API error ${res.status} for "${nameEn}"`);
  const results = await res.json();
  if (!Array.isArray(results) || results.length === 0) return null;

  // Preferir match exacto o más cercano
  const exact = results.find(
    (r) => r.name?.toLowerCase() === nameEn.toLowerCase()
  );
  return exact ?? results[0];
}

/** Descarga una URL y devuelve un Buffer */
async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

/** Sube un buffer a Supabase Storage y devuelve la URL pública */
async function uploadToStorage(supabase, buffer, filename, contentType) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType, upsert: true });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

/** Extiende el nombre del archivo a partir de la URL */
function fileExtFromUrl(url) {
  const ext = url.split('?')[0].split('.').pop().toLowerCase();
  if (['gif', 'jpg', 'jpeg', 'png', 'webp', 'mp4'].includes(ext)) return ext;
  return 'jpg';
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!SUPABASE_SERVICE_KEY) {
    console.error('❌  Falta SUPABASE_SERVICE_KEY. Ejecutá:');
    console.error('   SUPABASE_SERVICE_KEY=<tu_key> node scripts/upload-exercise-media.mjs');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // 1. Obtener ejercicios sin imagen
  const { data: exercises, error: fetchErr } = await supabase
    .from('exercises')
    .select('id, name_en')
    .is('image_url', null)
    .is('gif_url', null)
    .order('id');

  if (fetchErr) throw fetchErr;
  console.log(`📋  ${exercises.length} ejercicios sin imagen\n`);

  let ok = 0, skipped = 0, failed = 0;

  for (const ex of exercises) {
    console.log(`🔍  [${ex.id}] ${ex.name_en}`);

    // 2. Buscar en ExerciseDB
    let apiResult = null;
    try {
      apiResult = await searchExercise(ex.name_en);
      await sleep(600); // respetar rate limit
    } catch (e) {
      console.warn(`   ⚠️  API error: ${e.message}`);
      failed++;
      continue;
    }

    if (!apiResult) {
      console.warn(`   ⚠️  No encontrado en API`);
      skipped++;
      continue;
    }

    // 3. Solo usar GIF animado — saltar si no hay
    const gifUrl = apiResult.gifUrl ?? apiResult.gif_url ?? null;

    if (!gifUrl) {
      console.warn(`   ⚠️  Sin GIF en API — saltado`);
      skipped++;
      continue;
    }

    const slug = ex.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${ex.id}-${slug}.gif`;
    const contentType = 'image/gif';

    // 4. Descargar
    let buffer;
    try {
      buffer = await downloadImage(gifUrl);
    } catch (e) {
      console.warn(`   ⚠️  Descarga fallida: ${e.message}`);
      failed++;
      continue;
    }

    // 5. Subir a Storage
    let publicUrl;
    try {
      publicUrl = await uploadToStorage(supabase, buffer, filename, contentType);
    } catch (e) {
      console.warn(`   ⚠️  Upload fallido: ${e.message}`);
      failed++;
      continue;
    }

    // 6. Actualizar ejercicio en DB — GIFs van a image_url
    const updatePayload = { image_url: publicUrl };

    const { error: updateErr } = await supabase
      .from('exercises')
      .update(updatePayload)
      .eq('id', ex.id);

    if (updateErr) {
      console.warn(`   ⚠️  DB update fallido: ${updateErr.message}`);
      failed++;
      continue;
    }

    console.log(`   ✅  ${filename} → ${publicUrl}`);
    ok++;
  }

  console.log(`\n✅  OK: ${ok}  |  ⚠️  Sin resultado: ${skipped}  |  ❌  Error: ${failed}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
