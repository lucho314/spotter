/**
 * Fetches exercises from ExerciseDB RapidAPI, translates names to Spanish,
 * and generates SQL to reload the exercises table.
 * Run: node scripts/load-exercises-from-api.mjs > scripts/exercises-reload.sql
 */

const RAPIDAPI_KEY = '0f202c21fdmsh3d9821aa1978fa0p121377jsn0d84c415f2fe';
const RAPIDAPI_HOST = 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}/api/v1/exercises`;
const HEADERS = {
  'x-rapidapi-key': RAPIDAPI_KEY,
  'x-rapidapi-host': RAPIDAPI_HOST,
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ─── Muscle group mapping (API bodyParts → DB id) ──────────────────────────
const MUSCLE_GROUP_MAP = {
  'CHEST': 1, 'PECTORALS': 1,
  'BACK': 2, 'LATS': 2, 'UPPER BACK': 2, 'LOWER BACK': 2, 'SPINE': 2,
  'SHOULDERS': 3, 'DELTOIDS': 3, 'ANTERIOR DELTOID': 3,
  'UPPER ARMS': 4, 'BICEPS': 4, 'BRACHII': 4, 'BRACHIALIS': 4,
  'TRICEPS': 5,
  'UPPER LEGS': 6, 'LOWER LEGS': 6, 'THIGHS': 6, 'HAMSTRINGS': 6,
  'QUADRICEPS': 6, 'CALVES': 6, 'LEGS': 6, 'KNEES': 6,
  'GLUTES': 7, 'HIPS': 7, 'ADDUCTORS': 7, 'ABDUCTORS': 7,
  'ABS': 8, 'WAIST': 8, 'CORE': 8, 'OBLIQUES': 8,
  'FOREARMS': 9, 'WRIST': 9, 'GRIP': 9,
  'CARDIOVASCULAR SYSTEM': 10, 'CARDIO': 10,
};

function getMuscleGroupId(bodyParts, targetMuscles) {
  const all = [...(bodyParts || []), ...(targetMuscles || [])].map(s => s.toUpperCase());
  for (const part of all) {
    for (const [key, id] of Object.entries(MUSCLE_GROUP_MAP)) {
      if (part.includes(key)) return id;
    }
  }
  return 8; // default Core
}

// ─── Equipment mapping ─────────────────────────────────────────────────────
const EQUIPMENT_MAP = {
  'BARBELL': 'barbell', 'OLYMPIC BARBELL': 'barbell', 'EZ BARBELL': 'barbell',
  'DUMBBELL': 'dumbbell', 'DUMBBELLS': 'dumbbell',
  'CABLE': 'cable', 'PULLEY': 'cable',
  'MACHINE': 'machine', 'LEVERAGE MACHINE': 'machine', 'SMITH MACHINE': 'machine',
  'SLED MACHINE': 'machine', 'ASSISTED': 'machine',
  'BODY WEIGHT': 'bodyweight', 'BODYWEIGHT': 'bodyweight',
  'KETTLEBELL': 'kettlebell',
  'RESISTANCE BAND': 'band', 'BAND': 'band', 'ELASTIC BAND': 'band',
  'BOSU BALL': 'other', 'STABILITY BALL': 'other', 'MEDICINE BALL': 'other',
  'ROLLER': 'other', 'ROPE': 'other', 'TOWEL': 'other', 'SUSPENDED': 'other',
};

function getEquipment(equipments) {
  if (!equipments || equipments.length === 0) return 'bodyweight';
  const eq = equipments[0].toUpperCase();
  for (const [key, val] of Object.entries(EQUIPMENT_MAP)) {
    if (eq.includes(key)) return val;
  }
  return 'other';
}

// ─── Exercise type → category ──────────────────────────────────────────────
function getCategory(exerciseType) {
  const t = (exerciseType || '').toUpperCase();
  if (t === 'STRENGTH') return 'compound';
  if (t === 'CARDIO') return 'cardio';
  if (t === 'MOBILITY' || t === 'FLEXIBILITY') return 'stretch';
  if (t === 'PLYOMETRIC') return 'plyometric';
  return 'isolation';
}

// ─── Spanish translation ───────────────────────────────────────────────────
// Phrase-level translations (checked first, longer phrases take priority)
const PHRASE_MAP = [
  // Full exercise names
  ['hip thrust', 'Hip Thrust'],
  ['face pull', 'Face Pull'],
  ['arnold press', 'Press Arnold'],
  ['farmer walk', 'Farmer Walk'],
  ['russian twist', 'Russian Twist'],
  ['dead bug', 'Dead Bug'],
  ['mountain climber', 'Escaladores'],
  ['mountain climbers', 'Escaladores'],
  ['skull crusher', 'Press Francés'],
  ['skull crushers', 'Press Francés'],
  ['good morning', 'Buenos Días'],
  ['nordic hamstring', 'Isquiotibial Nórdico'],
  ['dragon flag', 'Dragon Flag'],
  ['l-sit', 'L-Sit'],
  ['l sit', 'L-Sit'],

  // Movement + equipment combos
  ['bench press', 'Press de Banca'],
  ['incline press', 'Press Inclinado'],
  ['decline press', 'Press Declinado'],
  ['overhead press', 'Press Militar'],
  ['shoulder press', 'Press de Hombros'],
  ['chest press', 'Press de Pecho'],
  ['leg press', 'Prensa de Piernas'],

  ['pull-up', 'Dominadas'],
  ['pull up', 'Dominadas'],
  ['chin-up', 'Chin-Up'],
  ['chin up', 'Chin-Up'],
  ['push-up', 'Flexiones'],
  ['push up', 'Flexiones'],
  ['sit-up', 'Abdominales'],
  ['sit up', 'Abdominales'],
  ['step-up', 'Subida al Banco'],
  ['step up', 'Subida al Banco'],
  ['pull-down', 'Jalón'],
  ['pull down', 'Jalón'],
  ['pulldown', 'Jalón'],

  ['deadlift', 'Peso Muerto'],
  ['romanian deadlift', 'Peso Muerto Rumano'],
  ['sumo deadlift', 'Peso Muerto Sumo'],
  ['stiff leg deadlift', 'Peso Muerto Piernas Rígidas'],
  ['straight leg deadlift', 'Peso Muerto Piernas Rectas'],

  ['squat', 'Sentadilla'],
  ['goblet squat', 'Sentadilla Goblet'],
  ['bulgarian split squat', 'Sentadilla Búlgara'],
  ['front squat', 'Sentadilla Frontal'],
  ['hack squat', 'Sentadilla Hack'],
  ['split squat', 'Sentadilla Dividida'],
  ['pistol squat', 'Sentadilla Pistol'],
  ['overhead squat', 'Sentadilla Sobre la Cabeza'],
  ['box squat', 'Sentadilla en Caja'],

  ['glute bridge', 'Puente de Glúteos'],
  ['hip hinge', 'Bisagra de Cadera'],
  ['hip abduction', 'Abducción de Cadera'],
  ['hip adduction', 'Aducción de Cadera'],
  ['hip extension', 'Extensión de Cadera'],
  ['hip flexion', 'Flexión de Cadera'],

  ['calf raise', 'Elevación de Talones'],
  ['lateral raise', 'Elevación Lateral'],
  ['front raise', 'Elevación Frontal'],
  ['rear delt', 'Deltoides Posterior'],
  ['rear delt fly', 'Apertura Posterior'],

  ['upright row', 'Remo al Mentón'],
  ['bent over row', 'Remo Inclinado'],
  ['bent-over row', 'Remo Inclinado'],
  ['cable row', 'Remo en Polea'],
  ['seated row', 'Remo Sentado'],
  ['t-bar row', 'Remo en T'],

  ['hammer curl', 'Curl Martillo'],
  ['preacher curl', 'Curl en Predicador'],
  ['concentration curl', 'Curl de Concentración'],
  ['spider curl', 'Curl Spider'],
  ['zottman curl', 'Curl Zottman'],
  ['reverse curl', 'Curl Inverso'],

  ['tricep pushdown', 'Extensión de Tríceps en Polea'],
  ['triceps pushdown', 'Extensión de Tríceps en Polea'],
  ['tricep dip', 'Fondos de Tríceps'],
  ['triceps dip', 'Fondos de Tríceps'],
  ['overhead tricep', 'Extensión de Tríceps Sobre la Cabeza'],

  ['ab wheel', 'Rueda Abdominal'],
  ['cable crunch', 'Crunch en Polea'],
  ['hanging leg raise', 'Elevación de Piernas Colgado'],
  ['leg raise', 'Elevación de Piernas'],
  ['knee raise', 'Elevación de Rodillas'],
  ['plank', 'Plancha'],
  ['side plank', 'Plancha Lateral'],
  ['dead hang', 'Colgado'],
  ['hang grip', 'Agarre Colgado'],
  ['hyperextension', 'Hiperextensión'],
  ['back extension', 'Extensión de Espalda'],

  ['leg extension', 'Extensión de Piernas'],
  ['leg curl', 'Curl de Piernas'],
  ['walking lunge', 'Zancada Caminando'],
  ['walking lunges', 'Zancadas Caminando'],
  ['reverse lunge', 'Zancada Inversa'],
  ['lunge', 'Zancada'],
  ['lunges', 'Zancadas'],

  ['wrist curl', 'Curl de Muñeca'],
  ['wrist extension', 'Extensión de Muñeca'],
  ['wrist roller', 'Rodillo de Muñeca'],
  ['reverse wrist curl', 'Curl de Muñeca Inverso'],

  ['jump rope', 'Saltar Cuerda'],
  ['burpee', 'Burpee'],
  ['burpees', 'Burpees'],
  ['jumping jack', 'Salto de Tijera'],
  ['box jump', 'Salto a la Caja'],
  ['treadmill', 'Cinta de Correr'],
  ['rowing machine', 'Máquina de Remo'],
  ['stationary bike', 'Bicicleta Estática'],
  ['elliptical', 'Elíptica'],
];

// Word-level translations (applied after phrase map)
const WORD_MAP = {
  'barbell': 'con Barra',
  'dumbbell': 'con Mancuerna',
  'dumbbells': 'con Mancuernas',
  'cable': 'en Polea',
  'machine': 'en Máquina',
  'kettlebell': 'con Kettlebell',
  'band': 'con Banda',
  'resistance': 'de Resistencia',
  'press': 'Press',
  'row': 'Remo',
  'curl': 'Curl',
  'extension': 'Extensión',
  'fly': 'Apertura',
  'flye': 'Apertura',
  'raise': 'Elevación',
  'crunch': 'Crunch',
  'dip': 'Fondos',
  'dips': 'Fondos',
  'shrug': 'Encogimiento',
  'shrugs': 'Encogimientos',
  'kickback': 'Patada Atrás',
  'pullover': 'Pullover',
  'thruster': 'Thruster',
  'clean': 'Clean',
  'snatch': 'Arrancada',
  'swing': 'Swing',
  'push': 'Empuje',
  'pull': 'Jalón',
  'chest': 'Pecho',
  'back': 'Espalda',
  'shoulder': 'Hombro',
  'shoulders': 'Hombros',
  'arm': 'Brazo',
  'arms': 'Brazos',
  'leg': 'Pierna',
  'legs': 'Piernas',
  'glute': 'Glúteo',
  'glutes': 'Glúteos',
  'core': 'Core',
  'abs': 'Abdominales',
  'abdominal': 'Abdominal',
  'bicep': 'Bíceps',
  'biceps': 'Bíceps',
  'tricep': 'Tríceps',
  'triceps': 'Tríceps',
  'quad': 'Cuádriceps',
  'quads': 'Cuádriceps',
  'hamstring': 'Isquiotibial',
  'hamstrings': 'Isquiotibiales',
  'calf': 'Pantorrilla',
  'calves': 'Pantorrillas',
  'forearm': 'Antebrazo',
  'forearms': 'Antebrazos',
  'seated': 'Sentado/a',
  'standing': 'De Pie',
  'lying': 'Tumbado/a',
  'incline': 'Inclinado',
  'decline': 'Declinado',
  'wide': 'Agarre Ancho',
  'narrow': 'Agarre Cerrado',
  'close': 'Cerrado',
  'reverse': 'Inverso',
  'alternating': 'Alternado',
  'single': 'Unilateral',
  'one': 'Un',
  'two': 'Dos',
  'double': 'Doble',
  'overhead': 'Sobre la Cabeza',
  'hip': 'Cadera',
  'knee': 'Rodilla',
  'lateral': 'Lateral',
  'front': 'Frontal',
  'rear': 'Posterior',
  'upper': 'Superior',
  'lower': 'Inferior',
  'inner': 'Interior',
  'outer': 'Exterior',
  'floor': 'en el Suelo',
  'wall': 'en Pared',
  'bench': 'en Banco',
  'ball': 'con Pelota',
  'weighted': 'con Peso',
  'assisted': 'Asistido',
  'elevated': 'Elevado',
  'diagonal': 'Diagonal',
  'rotational': 'Rotacional',
  'isometric': 'Isométrico',
  'explosive': 'Explosivo',
  'plyometric': 'Pliométrico',
  'walking': 'Caminando',
  'jumping': 'Saltando',
  'swing': 'Swing',
};

function translateToSpanish(englishName) {
  let name = englishName.toLowerCase().trim();

  // 1. Check phrase map (longest phrases first)
  for (const [eng, esp] of PHRASE_MAP) {
    if (name === eng) return esp;
  }

  // 2. Try to find the longest matching phrase and replace
  let translated = name;
  const sortedPhrases = [...PHRASE_MAP].sort((a, b) => b[0].length - a[0].length);
  for (const [eng, esp] of sortedPhrases) {
    if (translated.includes(eng)) {
      translated = translated.replace(eng, esp);
      break; // one phrase replacement per exercise
    }
  }

  // 3. If translation happened, clean up remaining English words
  if (translated !== name) {
    // The translated part already has Spanish, keep the rest mostly as-is
    // Just capitalize properly
    return translated
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .trim();
  }

  // 4. Word-by-word translation
  const words = name.split(' ');
  const translatedWords = words.map(w => WORD_MAP[w] || (w.charAt(0).toUpperCase() + w.slice(1)));
  return translatedWords.join(' ').trim();
}

// ─── Fetch exercises ───────────────────────────────────────────────────────
async function fetchExercises(limit = 200) {
  const exercises = [];
  let cursor = null;
  let page = 1;

  while (exercises.length < limit) {
    const pageLimit = Math.min(50, limit - exercises.length);
    const url = cursor
      ? `${BASE_URL}?limit=${pageLimit}&cursor=${cursor}`
      : `${BASE_URL}?limit=${pageLimit}`;

    process.stderr.write(`Page ${page} (${exercises.length}/${limit})...\n`);
    const res = await fetch(url, { headers: HEADERS });
    const json = await res.json();

    if (!json.success || !json.data?.length) break;

    exercises.push(...json.data);

    if (!json.meta?.hasNextPage || !json.meta?.nextCursor) break;
    cursor = json.meta.nextCursor;
    page++;
    await sleep(250);
  }

  return exercises.slice(0, limit);
}

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
  return String(val);
}

function jsonArraySql(arr) {
  if (!arr || arr.length === 0) return "'[]'::jsonb";
  return `'${JSON.stringify(arr).replace(/'/g, "''")}'::jsonb`;
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  process.stderr.write('Fetching 200 exercises from API...\n');
  const exercises = await fetchExercises(200);
  process.stderr.write(`Fetched ${exercises.length} exercises\n\n`);

  console.log('-- =============================================');
  console.log('-- Exercise table reload from ExerciseDB API');
  console.log('-- =============================================\n');

  // Truncate all dependent tables (CASCADE handles the rest)
  console.log('-- Truncate all dependent tables');
  console.log('TRUNCATE TABLE personal_records CASCADE;');
  console.log('TRUNCATE TABLE workout_sets CASCADE;');
  console.log('TRUNCATE TABLE routine_exercises CASCADE;');
  console.log('TRUNCATE TABLE template_day_exercises CASCADE;');
  console.log('TRUNCATE TABLE workout_sessions CASCADE;');
  console.log('TRUNCATE TABLE routines CASCADE;');
  console.log('TRUNCATE TABLE exercises RESTART IDENTITY CASCADE;');
  console.log('');

  console.log('-- Insert exercises');
  console.log('INSERT INTO exercises (name, name_en, muscle_group_id, equipment, image_url, gif_url, secondary_muscles, instructions, difficulty, category, exercisedb_id) VALUES');

  const rows = exercises.map((ex, idx) => {
    const nameEs = translateToSpanish(ex.name);
    const nameEn = ex.name;
    const muscleGroupId = getMuscleGroupId(ex.bodyParts, ex.targetMuscles);
    const equipment = getEquipment(ex.equipments);
    const imageUrl = ex.imageUrl || null;
    const gifUrl = null; // video URLs require detail endpoint, skip for now
    const secondaryMuscles = (ex.secondaryMuscles || []).map(m =>
      m.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    );
    const instructions = []; // requires detail endpoint
    const difficulty = null;
    const category = getCategory(ex.exerciseType);
    const exercisedbId = ex.exerciseId;

    return `  (${escapeSql(nameEs)}, ${escapeSql(nameEn)}, ${muscleGroupId}, '${equipment}', ${escapeSql(imageUrl)}, ${escapeSql(gifUrl)}, ${jsonArraySql(secondaryMuscles)}, ${jsonArraySql(instructions)}, ${escapeSql(difficulty)}, '${category}', ${escapeSql(exercisedbId)})`;
  });

  console.log(rows.join(',\n') + ';');

  process.stderr.write(`\nGenerated INSERT for ${exercises.length} exercises\n`);
  process.stderr.write('Done!\n');
}

main().catch(console.error);
