/**
 * Script to generate SQL updates for exercise image_url and gif_url (video)
 * from ExerciseDB RapidAPI. Searches each exercise by name_en.
 * Run: node scripts/populate-exercise-media.mjs
 */

const RAPIDAPI_KEY = '0f202c21fdmsh3d9821aa1978fa0p121377jsn0d84c415f2fe';
const RAPIDAPI_HOST = 'edb-with-videos-and-images-by-ascendapi.p.rapidapi.com';
const BASE_URL = `https://${RAPIDAPI_HOST}/api/v1/exercises`;
const HEADERS = {
  'x-rapidapi-key': RAPIDAPI_KEY,
  'x-rapidapi-host': RAPIDAPI_HOST,
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const DB_EXERCISES = [
  { id: 1, name_en: 'Bench Press' },
  { id: 2, name_en: 'Incline Dumbbell Press' },
  { id: 3, name_en: 'Dumbbell Flyes' },
  { id: 4, name_en: 'Dips' },
  { id: 5, name_en: 'Cable Crossover' },
  { id: 6, name_en: 'Deadlift' },
  { id: 7, name_en: 'Pull-ups' },
  { id: 8, name_en: 'Barbell Row' },
  { id: 9, name_en: 'Dumbbell Row' },
  { id: 10, name_en: 'Lat Pulldown' },
  { id: 11, name_en: 'Seated Cable Row' },
  { id: 12, name_en: 'Overhead Press' },
  { id: 13, name_en: 'Lateral Raises' },
  { id: 14, name_en: 'Face Pull' },
  { id: 15, name_en: 'Arnold Press' },
  { id: 16, name_en: 'Barbell Curl' },
  { id: 17, name_en: 'Dumbbell Curl' },
  { id: 18, name_en: 'Hammer Curl' },
  { id: 19, name_en: 'Tricep Pushdown' },
  { id: 20, name_en: 'Skull Crushers' },
  { id: 21, name_en: 'Bench Dips' },
  { id: 22, name_en: 'Barbell Squat' },
  { id: 23, name_en: 'Leg Press' },
  { id: 24, name_en: 'Leg Extension' },
  { id: 25, name_en: 'Leg Curl' },
  { id: 26, name_en: 'Lunges' },
  { id: 27, name_en: 'Bulgarian Split Squat' },
  { id: 28, name_en: 'Hip Thrust' },
  { id: 29, name_en: 'Romanian Deadlift' },
  { id: 30, name_en: 'Plank' },
  { id: 31, name_en: 'Cable Crunch' },
  { id: 32, name_en: 'Ab Wheel Rollout' },
  { id: 33, name_en: 'Cable Upright Row' },
  { id: 34, name_en: 'Decline Bench Press' },
  { id: 35, name_en: 'Machine Chest Press' },
  { id: 36, name_en: 'Push-ups' },
  { id: 37, name_en: 'Incline Barbell Press' },
  { id: 38, name_en: 'Pec Deck Fly' },
  { id: 39, name_en: 'Dumbbell Pullover' },
  { id: 40, name_en: 'Flat Dumbbell Press' },
  { id: 41, name_en: 'Neutral Grip Pulldown' },
  { id: 42, name_en: 'T-Bar Row' },
  { id: 43, name_en: 'Machine Row' },
  { id: 44, name_en: 'Sumo Deadlift' },
  { id: 45, name_en: 'Back Hyperextension' },
  { id: 46, name_en: 'Inverted Row' },
  { id: 47, name_en: 'Barbell Shrug' },
  { id: 48, name_en: 'Chin-up' },
  { id: 49, name_en: 'Dumbbell Deadlift' },
  { id: 50, name_en: 'Seated Dumbbell Press' },
  { id: 51, name_en: 'Front Raise' },
  { id: 52, name_en: 'Cable Lateral Raise' },
  { id: 53, name_en: 'Standing Dumbbell Press' },
  { id: 54, name_en: 'Rear Delt Fly' },
  { id: 55, name_en: 'Reverse Pec Deck' },
  { id: 56, name_en: 'Upright Row' },
  { id: 57, name_en: 'Incline Dumbbell Curl' },
  { id: 58, name_en: 'Preacher Curl' },
  { id: 59, name_en: 'Concentration Curl' },
  { id: 60, name_en: 'EZ Bar Curl' },
  { id: 61, name_en: 'Cable Curl' },
  { id: 62, name_en: 'Reverse Barbell Curl' },
  { id: 63, name_en: '21s Curl' },
  { id: 64, name_en: 'Overhead Tricep Extension' },
  { id: 65, name_en: 'Straight Bar Pushdown' },
  { id: 66, name_en: 'Tricep Kickback' },
  { id: 67, name_en: 'Close Grip Bench Press' },
  { id: 68, name_en: 'Single Arm Tricep Extension' },
  { id: 69, name_en: 'Machine Dips' },
  { id: 70, name_en: 'Diamond Push-up' },
  { id: 71, name_en: 'Goblet Squat' },
  { id: 72, name_en: 'Front Squat' },
  { id: 73, name_en: 'Bodyweight Squat' },
  { id: 74, name_en: '45 Degree Leg Press' },
  { id: 75, name_en: 'Hack Squat' },
  { id: 76, name_en: 'Walking Lunges' },
  { id: 77, name_en: 'Stiff Leg Deadlift' },
  { id: 78, name_en: 'Step-up' },
  { id: 79, name_en: 'Cable Hip Extension' },
  { id: 80, name_en: 'Standing Calf Raise' },
  { id: 81, name_en: 'Seated Calf Raise' },
  { id: 82, name_en: 'Standing Leg Curl' },
  { id: 83, name_en: 'Cable Kickback' },
  { id: 84, name_en: 'Hip Abduction Machine' },
  { id: 85, name_en: 'Glute Bridge' },
  { id: 86, name_en: 'Band Monster Walk' },
  { id: 87, name_en: 'Band Squat' },
  { id: 88, name_en: 'Crunches' },
  { id: 89, name_en: 'Hanging Leg Raise' },
  { id: 90, name_en: 'Kneeling Ab Wheel' },
  { id: 91, name_en: 'Side Plank' },
  { id: 92, name_en: 'Mountain Climbers' },
  { id: 93, name_en: 'Russian Twist' },
  { id: 94, name_en: 'Dead Bug' },
  { id: 95, name_en: 'L-Sit' },
  { id: 96, name_en: 'Wrist Curl' },
  { id: 97, name_en: 'Wrist Extension' },
  { id: 98, name_en: 'Farmer Walk' },
  { id: 99, name_en: 'Dead Hang' },
  { id: 100, name_en: 'Treadmill' },
  { id: 101, name_en: 'Jump Rope' },
  { id: 102, name_en: 'Burpees' },
  { id: 103, name_en: 'Rowing Machine' },
];

function normalize(str) {
  return (str || '').toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreMatch(dbName, apiName) {
  const db = normalize(dbName);
  const api = normalize(apiName);
  if (db === api) return 100;
  if (api.includes(db) || db.includes(api)) return 80;
  const dbWords = db.split(' ').filter(w => w.length > 2);
  const apiWords = api.split(' ').filter(w => w.length > 2);
  if (dbWords.length === 0) return 0;
  const matched = dbWords.filter(w => api.includes(w)).length;
  return Math.round((matched / dbWords.length) * 60);
}

async function searchExercise(nameEn) {
  const encoded = encodeURIComponent(nameEn);
  const url = `${BASE_URL}?name=${encoded}&limit=25`;
  const res = await fetch(url, { headers: HEADERS });
  const json = await res.json();
  return json.data || [];
}

async function fetchDetail(exerciseId) {
  const res = await fetch(`${BASE_URL}/${exerciseId}`, { headers: HEADERS });
  const json = await res.json();
  return json.data;
}

function escapeSql(str) {
  return (str || '').replace(/'/g, "''");
}

async function main() {
  const results = [];
  const unmatched = [];

  console.log('-- Exercise media URLs migration');
  console.log('-- Generated by populate-exercise-media.mjs\n');

  for (const dbEx of DB_EXERCISES) {
    process.stderr.write(`[${dbEx.id}] Searching "${dbEx.name_en}"...\n`);

    try {
      const candidates = await searchExercise(dbEx.name_en);
      await sleep(200);

      if (candidates.length === 0) {
        process.stderr.write(`  → no results\n`);
        unmatched.push(dbEx);
        continue;
      }

      // Score each candidate and pick the best
      const scored = candidates
        .map(c => ({ candidate: c, score: scoreMatch(dbEx.name_en, c.name) }))
        .sort((a, b) => b.score - a.score);

      const best = scored[0];

      if (best.score < 40) {
        process.stderr.write(`  → best match "${best.candidate.name}" score ${best.score} (too low, skipping)\n`);
        unmatched.push(dbEx);
        continue;
      }

      process.stderr.write(`  → "${best.candidate.name}" (score: ${best.score})\n`);

      // Fetch detail for video URL
      const detail = await fetchDetail(best.candidate.exerciseId);
      await sleep(200);

      const imageUrl = detail?.imageUrls?.['360p'] || detail?.imageUrl || null;
      const videoUrl = detail?.videoUrl || null;

      if (!imageUrl && !videoUrl) {
        process.stderr.write(`  → no media URLs, skipping\n`);
        unmatched.push(dbEx);
        continue;
      }

      const sets = [];
      if (imageUrl) sets.push(`image_url = '${escapeSql(imageUrl)}'`);
      if (videoUrl) sets.push(`gif_url = '${escapeSql(videoUrl)}'`);
      sets.push(`exercisedb_id = '${escapeSql(best.candidate.exerciseId)}'`);

      console.log(`-- [${dbEx.id}] ${dbEx.name_en} → ${best.candidate.name} (score: ${best.score})`);
      console.log(`UPDATE exercises SET ${sets.join(', ')} WHERE id = ${dbEx.id};`);
      results.push(dbEx.id);

    } catch (e) {
      process.stderr.write(`  → ERROR: ${e.message}\n`);
      unmatched.push(dbEx);
    }
  }

  process.stderr.write(`\n=== Summary ===\n`);
  process.stderr.write(`Updated: ${results.length}/${DB_EXERCISES.length}\n`);
  process.stderr.write(`Unmatched (${unmatched.length}): ${unmatched.map(e => e.name_en).join(', ')}\n`);
}

main().catch(console.error);
