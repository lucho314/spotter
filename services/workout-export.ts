import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

interface ExportSet {
  set_number: number;
  weight_kg: number;
  reps: number;
  rpe?: number | null;
}

interface ExportExercise {
  name: string;
  sets: ExportSet[];
}

export interface WorkoutExportData {
  routineName: string;
  date: string;
  duration: string;
  totalVolume: number;
  totalSets: number;
  exercises: ExportExercise[];
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function buildExercisesFromSets(
  sets: Array<{ exercise_id: number; set_number: number; weight_kg: number; reps: number; rpe?: number | null; exercises?: { name: string } | null }>
): ExportExercise[] {
  const map = new Map<number, ExportExercise>();
  for (const s of sets) {
    if (!map.has(s.exercise_id)) {
      map.set(s.exercise_id, {
        name: s.exercises?.name ?? 'Ejercicio',
        sets: [],
      });
    }
    map.get(s.exercise_id)!.sets.push({
      set_number: s.set_number,
      weight_kg: s.weight_kg,
      reps: s.reps,
      rpe: s.rpe,
    });
  }
  return Array.from(map.values());
}

function buildExercisesRowsHtml(exercises: ExportExercise[]): string {
  return exercises
    .map((ex) => {
      const setsRows = ex.sets
        .sort((a, b) => a.set_number - b.set_number)
        .map(
          (s) => `
          <tr>
            <td class="set-num">${s.set_number}</td>
            <td class="set-val">${s.weight_kg} kg</td>
            <td class="set-val">${s.reps} reps</td>
            <td class="set-rpe">${s.rpe != null ? `RPE ${s.rpe}` : '—'}</td>
          </tr>`
        )
        .join('');

      const totalVol = ex.sets.reduce((acc, s) => acc + s.weight_kg * s.reps, 0);

      return `
        <div class="exercise-block">
          <div class="exercise-header">
            <span class="exercise-name">${ex.name}</span>
            <span class="exercise-vol">${Math.round(totalVol).toLocaleString('es-AR')} kg vol.</span>
          </div>
          <table class="sets-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Peso</th>
                <th>Reps</th>
                <th>RPE</th>
              </tr>
            </thead>
            <tbody>${setsRows}</tbody>
          </table>
        </div>`;
    })
    .join('');
}

function generatePdfHtml(data: WorkoutExportData): string {
  const exercisesHtml = buildExercisesRowsHtml(data.exercises);

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
      background: #0e0e0e;
      color: #ffffff;
      padding: 40px 32px;
      min-height: 100vh;
    }

    /* HEADER */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
      padding-bottom: 20px;
      border-bottom: 1px solid #2c2c2c;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-dot {
      width: 28px;
      height: 28px;
      background: #d1fc00;
      border-radius: 6px;
    }
    .brand-name {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 2px;
      color: #d1fc00;
      text-transform: uppercase;
    }
    .header-date {
      font-size: 13px;
      color: #adaaaa;
      text-transform: capitalize;
    }

    /* HERO */
    .hero {
      background: #1a1a1a;
      border-radius: 16px;
      padding: 24px 28px;
      margin-bottom: 24px;
    }
    .routine-name {
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 20px;
      letter-spacing: -0.5px;
    }
    .stats-row {
      display: flex;
      gap: 40px;
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .stat-value {
      font-size: 28px;
      font-weight: 800;
      line-height: 1;
    }
    .stat-value.cyan { color: #00e3fd; }
    .stat-value.lime { color: #d1fc00; }
    .stat-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1.5px;
      color: #adaaaa;
      text-transform: uppercase;
    }

    /* SECTION TITLE */
    .section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #adaaaa;
      text-transform: uppercase;
      margin-bottom: 12px;
      margin-top: 4px;
    }

    /* EXERCISE BLOCK */
    .exercise-block {
      background: #1a1a1a;
      border-radius: 14px;
      margin-bottom: 12px;
      overflow: hidden;
    }
    .exercise-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 18px 10px;
      border-bottom: 1px solid #2c2c2c;
    }
    .exercise-name {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
    }
    .exercise-vol {
      font-size: 12px;
      font-weight: 600;
      color: #d1fc00;
    }
    .sets-table {
      width: 100%;
      border-collapse: collapse;
    }
    .sets-table thead tr {
      background: #131313;
    }
    .sets-table th {
      padding: 7px 18px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #767575;
      text-transform: uppercase;
      text-align: left;
    }
    .sets-table th:not(:first-child) { text-align: center; }
    .sets-table tbody tr {
      border-bottom: 1px solid #222222;
    }
    .sets-table tbody tr:last-child { border-bottom: none; }
    .sets-table td {
      padding: 9px 18px;
      font-size: 14px;
    }
    td.set-num {
      color: #767575;
      font-weight: 600;
      width: 32px;
    }
    td.set-val {
      color: #ffffff;
      font-weight: 600;
      text-align: center;
    }
    td.set-rpe {
      color: #00e3fd;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }

    /* FOOTER */
    .footer {
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid #2c2c2c;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-text {
      font-size: 12px;
      color: #484847;
    }
    .footer-brand {
      font-size: 12px;
      font-weight: 700;
      color: #484847;
      letter-spacing: 1.5px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-dot"></div>
      <span class="brand-name">Spotter</span>
    </div>
    <span class="header-date">${data.date}</span>
  </div>

  <div class="hero">
    <div class="routine-name">${data.routineName}</div>
    <div class="stats-row">
      <div class="stat">
        <span class="stat-value cyan">${data.duration}</span>
        <span class="stat-label">Duración</span>
      </div>
      <div class="stat">
        <span class="stat-value lime">${Math.round(data.totalVolume).toLocaleString('es-AR')}</span>
        <span class="stat-label">KG Total</span>
      </div>
      <div class="stat">
        <span class="stat-value" style="color:#ffffff">${data.totalSets}</span>
        <span class="stat-label">Series</span>
      </div>
      <div class="stat">
        <span class="stat-value" style="color:#ffffff">${data.exercises.length}</span>
        <span class="stat-label">Ejercicios</span>
      </div>
    </div>
  </div>

  <div class="section-title">Ejercicios</div>
  ${exercisesHtml}

  <div class="footer">
    <span class="footer-text">Generado con Spotter</span>
    <span class="footer-brand">SPOTTER</span>
  </div>
</body>
</html>`;
}

export async function shareWorkoutAsPdf(
  session: {
    started_at: string;
    completed_at?: string | null;
    routines?: { name: string } | null;
    workout_sets?: Array<{
      exercise_id: number;
      set_number: number;
      weight_kg: number;
      reps: number;
      rpe?: number | null;
      exercises?: { name: string } | null;
    }>;
  }
): Promise<void> {
  const sets = session.workout_sets ?? [];
  const exercises = buildExercisesFromSets(sets);

  const totalVolume = sets.reduce((acc, s) => acc + s.weight_kg * s.reps, 0);

  let duration = '—';
  if (session.completed_at) {
    const ms = new Date(session.completed_at).getTime() - new Date(session.started_at).getTime();
    const min = Math.floor(ms / 60000);
    duration = min < 60 ? `${min} min` : `${Math.floor(min / 60)}h ${min % 60}min`;
  }

  const data: WorkoutExportData = {
    routineName: session.routines?.name ?? 'Entrenamiento libre',
    date: formatDate(session.started_at),
    duration,
    totalVolume,
    totalSets: sets.length,
    exercises,
  };

  const html = generatePdfHtml(data);
  const { uri } = await Print.printToFileAsync({ html, base64: false });
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Compartir entrenamiento',
    UTI: 'com.adobe.pdf',
  });
}

type SessionInput = Parameters<typeof shareWorkoutAsPdf>[0];

function buildStoryData(session: SessionInput) {
  const sets = session.workout_sets ?? [];
  const exercises = buildExercisesFromSets(sets);
  const totalVolume = sets.reduce((acc, s) => acc + s.weight_kg * s.reps, 0);
  let duration = '—';
  if (session.completed_at) {
    const ms = new Date(session.completed_at).getTime() - new Date(session.started_at).getTime();
    const min = Math.floor(ms / 60000);
    duration = min < 60 ? `${min} min` : `${Math.floor(min / 60)}h ${min % 60}min`;
  }
  return {
    routineName: session.routines?.name ?? 'Entrenamiento libre',
    date: formatDate(session.started_at),
    duration,
    totalVolume,
    totalSets: sets.length,
    exercises,
  };
}

function generateStoryHtml(data: WorkoutExportData): string {
  // Show max 4 exercises to keep card compact
  const visible = data.exercises.slice(0, 4);
  const hidden = data.exercises.length - visible.length;

  const exerciseRows = visible
    .map((ex, i) => {
      const topSet = [...ex.sets].sort((a, b) => b.weight_kg - a.weight_kg)[0];
      const summary = topSet
        ? `${ex.sets.length} × ${topSet.reps} reps — ${topSet.weight_kg} kg`
        : `${ex.sets.length} series`;
      return `
        <div class="ex-row">
          <div class="ex-idx">${i + 1}</div>
          <span class="ex-name">${ex.name}</span>
          <span class="ex-summary">${summary}</span>
        </div>`;
    })
    .join('');

  const moreHtml =
    hidden > 0
      ? `<div class="ex-more">+${hidden} ejercicio${hidden > 1 ? 's' : ''} más</div>`
      : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <style>
    @page { size: 390px 693px; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 390px; height: 693px; overflow: hidden;
      font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
      background: #0e0e0e; color: #fff;
    }
    .card {
      width: 390px; height: 693px;
      padding: 32px 28px 24px;
      display: flex; flex-direction: column; justify-content: space-between;
      position: relative;
    }
    .accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: #d1fc00; }

    /* HEADER */
    .header { display: flex; align-items: center; justify-content: space-between; }
    .brand { display: flex; align-items: center; gap: 8px; }
    .brand-dot { width: 20px; height: 20px; background: #d1fc00; border-radius: 4px; }
    .brand-name { font-size: 15px; font-weight: 800; color: #d1fc00; letter-spacing: 2px; }
    .date { font-size: 11px; color: #adaaaa; text-transform: capitalize; }

    /* HERO */
    .hero { background: #1a1a1a; border-radius: 16px; padding: 20px; }
    .routine-name { font-size: 30px; font-weight: 900; color: #fff; letter-spacing: -1px; line-height: 1.1; margin-bottom: 16px; }
    .stats { display: flex; gap: 20px; align-items: center; }
    .stat { display: flex; flex-direction: column; gap: 3px; }
    .stat-val { font-size: 26px; font-weight: 800; line-height: 1; }
    .cyan { color: #00e3fd; }
    .lime { color: #d1fc00; }
    .stat-lbl { font-size: 9px; font-weight: 700; letter-spacing: 1.5px; color: #adaaaa; text-transform: uppercase; }
    .divider { width: 1px; height: 40px; background: #2c2c2c; }

    /* EXERCISES */
    .exercises { display: flex; flex-direction: column; gap: 8px; }
    .ex-row {
      display: flex; align-items: center; gap: 10px;
      background: #1a1a1a; border-radius: 10px;
      padding: 9px 12px;
    }
    .ex-idx {
      width: 22px; height: 22px; border-radius: 6px;
      background: #2c2c2c; display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; color: #adaaaa; flex-shrink: 0;
    }
    .ex-name { flex: 1; font-size: 13px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ex-summary { font-size: 11px; font-weight: 600; color: #adaaaa; white-space: nowrap; flex-shrink: 0; }
    .ex-more { font-size: 11px; color: #adaaaa; text-align: center; padding-top: 2px; }

    /* FOOTER */
    .footer { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .footer-line { width: 40px; height: 2px; background: #d1fc00; border-radius: 1px; }
    .footer-text { font-size: 10px; font-weight: 700; color: #484847; letter-spacing: 1.5px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="card">
    <div class="accent"></div>
    <div class="header">
      <div class="brand">
        <div class="brand-dot"></div>
        <span class="brand-name">SPOTTER</span>
      </div>
      <span class="date">${data.date}</span>
    </div>
    <div class="hero">
      <div class="routine-name">${data.routineName}</div>
      <div class="stats">
        <div class="stat">
          <span class="stat-val cyan">${data.duration}</span>
          <span class="stat-lbl">Duración</span>
        </div>
        <div class="divider"></div>
        <div class="stat">
          <span class="stat-val lime">${Math.round(data.totalVolume).toLocaleString('es-AR')}</span>
          <span class="stat-lbl">KG Total</span>
        </div>
      </div>
    </div>
    <div class="exercises">
      ${exerciseRows}
      ${moreHtml}
    </div>
    <div class="footer">
      <div class="footer-line"></div>
      <span class="footer-text">Entrenado con SPOTTER</span>
    </div>
  </div>
</body>
</html>`;
}

export async function shareWorkoutAsStory(session: SessionInput): Promise<void> {
  const data = buildStoryData(session);
  const html = generateStoryHtml(data);
  const { uri } = await Print.printToFileAsync({
    html,
    base64: false,
    width: 390,
    height: 693,
  });
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Compartir historia',
    UTI: 'com.adobe.pdf',
  });
}
