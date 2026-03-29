/**
 * Busca GIFs de ejercicios en Google Images usando Puppeteer,
 * los descarga y sube a Supabase Storage.
 *
 * Run: SUPABASE_SERVICE_KEY=<key> node scripts/scrape-exercise-gifs.mjs
 */

import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bqqpfldwzkfdvlvfjkbr.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? '';
const BUCKET = 'exercise-media';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function findGifOnBing(page, exerciseName) {
  const query = encodeURIComponent(`${exerciseName} exercise gif`);
  await page.goto(
    `https://www.bing.com/images/search?q=${query}&qft=+filterui:photo-animatedgif`,
    { waitUntil: 'networkidle2', timeout: 15000 }
  );
  await sleep(1000);

  // Bing guarda la URL del GIF en el atributo "m" de cada resultado .iusc
  const gifUrl = await page.evaluate(() => {
    const items = [...document.querySelectorAll('.iusc')];
    for (const item of items) {
      try {
        const data = JSON.parse(item.getAttribute('m') ?? '{}');
        if (data.murl?.includes('.gif')) return data.murl;
      } catch {}
    }
    return null;
  });

  return gifUrl;
}

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const ct = res.headers.get('content-type') ?? '';
  if (!ct.includes('gif') && !ct.includes('image')) throw new Error(`Not an image: ${ct}`);
  return Buffer.from(await res.arrayBuffer());
}

async function uploadToStorage(supabase, buffer, filename) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType: 'image/gif', upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

async function main() {
  if (!SUPABASE_SERVICE_KEY) {
    console.error('Falta SUPABASE_SERVICE_KEY');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const { data: exercises, error } = await supabase
    .from('exercises')
    .select('id, name_en')
    .is('image_url', null)
    .is('gif_url', null)
    .order('id');
  if (error) throw error;

  console.log(`📋  ${exercises.length} ejercicios sin imagen\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US'],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
  );
  await page.setViewport({ width: 1280, height: 800 });

  let ok = 0, skipped = 0, failed = 0;

  for (const ex of exercises) {
    console.log(`🔍  [${ex.id}] ${ex.name_en}`);
    let gifUrl = null;

    try {
      gifUrl = await findGifOnBing(page, ex.name_en);
    } catch (e) {
      console.warn(`   ⚠️  Error buscando: ${e.message}`);
      failed++;
      continue;
    }

    if (!gifUrl || !gifUrl.includes('http')) {
      console.warn(`   ⚠️  No se encontró GIF`);
      skipped++;
      continue;
    }

    console.log(`   🌐  ${gifUrl.slice(0, 80)}...`);

    let buffer;
    try {
      buffer = await downloadBuffer(gifUrl);
    } catch (e) {
      console.warn(`   ⚠️  Descarga fallida: ${e.message}`);
      failed++;
      continue;
    }

    const slug = ex.name_en.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${ex.id}-${slug}.gif`;

    let publicUrl;
    try {
      publicUrl = await uploadToStorage(supabase, buffer, filename);
    } catch (e) {
      console.warn(`   ⚠️  Upload fallido: ${e.message}`);
      failed++;
      continue;
    }

    const { error: updateErr } = await supabase
      .from('exercises')
      .update({ image_url: publicUrl })
      .eq('id', ex.id);

    if (updateErr) {
      console.warn(`   ⚠️  DB error: ${updateErr.message}`);
      failed++;
      continue;
    }

    console.log(`   ✅  Guardado: ${publicUrl}`);
    ok++;
    await sleep(1000);
  }

  await browser.close();
  console.log(`\n✅ OK: ${ok}  |  ⚠️ Sin GIF: ${skipped}  |  ❌ Error: ${failed}`);
}

main().catch(e => { console.error(e); process.exit(1); });
