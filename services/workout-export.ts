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

// ─── Canvas-based story image — kept for future use ──────────────────────────

export function buildStoryExportData(session: SessionInput): WorkoutExportData {
  return buildStoryData(session);
}

export function generateStoryCanvasHtml(data: WorkoutExportData): string {
  // Serialize data safely as JSON embedded in the script
  const json = JSON.stringify({
    routineName: data.routineName,
    date: data.date,
    duration: data.duration,
    totalVolume: data.totalVolume,
    exercises: data.exercises.map((ex) => ({
      name: ex.name,
      sets: ex.sets.map((s) => ({ weight_kg: s.weight_kg, reps: s.reps })),
    })),
  });

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#000;overflow:hidden">
<canvas id="c" width="1080" height="1920" style="display:block"></canvas>
<script>
window.onerror = function(msg, src, line, col, err) {
  window.ReactNativeWebView.postMessage(JSON.stringify({ok:false, error:'onerror: '+msg+' ('+line+':'+col+')'}));
  return true;
};
(function(){
  try {
    var data = ${json};
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    var W = 1080, H = 1920, P = 72;

    // toLocaleString is unreliable in Android WebView — use manual formatter
    function fmtNum(n) {
      return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    function rr(x,y,w,h,r){
      ctx.beginPath();
      ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
      ctx.quadraticCurveTo(x+w,y,x+w,y+r);
      ctx.lineTo(x+w,y+h-r);
      ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
      ctx.lineTo(x+r,y+h);
      ctx.quadraticCurveTo(x,y+h,x,y+h-r);
      ctx.lineTo(x,y+r);
      ctx.quadraticCurveTo(x,y,x+r,y);
      ctx.closePath();
    }

    function trunc(text, maxW){
      if(ctx.measureText(text).width <= maxW) return text;
      while(text.length > 0 && ctx.measureText(text+'…').width > maxW) text = text.slice(0,-1);
      return text+'…';
    }

    // 1. Background
    ctx.fillStyle='#0e0e0e'; ctx.fillRect(0,0,W,H);

    // 2. Top accent bar
    ctx.fillStyle='#d1fc00'; ctx.fillRect(0,0,W,6);

    // 3. Header
    ctx.fillStyle='#d1fc00'; rr(P,90,52,52,12); ctx.fill();
    ctx.fillStyle='#d1fc00'; ctx.font='bold 44px Arial';
    ctx.textBaseline='middle'; ctx.textAlign='left';
    ctx.fillText('SPOTTER', P+72, 116);
    ctx.fillStyle='#adaaaa'; ctx.font='32px Arial';
    ctx.textAlign='right';
    ctx.fillText(data.date, W-P, 116);

    // 4. Hero card
    ctx.fillStyle='#1a1a1a'; rr(P,196,W-P*2,460,32); ctx.fill();
    ctx.fillStyle='#ffffff'; ctx.font='bold 78px Arial';
    ctx.textAlign='left'; ctx.textBaseline='top';
    ctx.fillText(trunc(data.routineName, W-P*2-80), P+40, 238);

    // Stats
    var sY=430;
    ctx.fillStyle='#00e3fd'; ctx.font='bold 68px Arial'; ctx.textBaseline='top';
    ctx.fillText(data.duration, P+40, sY);
    ctx.fillStyle='#adaaaa'; ctx.font='bold 26px Arial';
    ctx.fillText('DURACIÓN', P+40, sY+82);

    ctx.fillStyle='#2c2c2c'; ctx.fillRect(P+40+252,sY-8,2,96);

    var volX=P+40+270;
    var volT=fmtNum(data.totalVolume)+' kg';
    ctx.fillStyle='#d1fc00'; ctx.font='bold 68px Arial'; ctx.textBaseline='top';
    ctx.fillText(volT, volX, sY);
    ctx.fillStyle='#adaaaa'; ctx.font='bold 26px Arial';
    ctx.fillText('VOLUMEN', volX, sY+82);

    // 5. Exercises
    var exY=720, exH=104, exGap=12;
    var vis=data.exercises.slice(0,4);
    vis.forEach(function(ex,i){
      var y=exY+i*(exH+exGap);
      ctx.fillStyle='#1a1a1a'; rr(P,y,W-P*2,exH,18); ctx.fill();
      ctx.fillStyle='#262626'; rr(P+16,y+22,52,52,10); ctx.fill();
      ctx.fillStyle='#adaaaa'; ctx.font='bold 30px Arial';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(String(i+1), P+42, y+48);
      ctx.fillStyle='#ffffff'; ctx.font='bold 40px Arial';
      ctx.textAlign='left';
      ctx.fillText(trunc(ex.name, W-P*2-300), P+88, y+48);
      var top=ex.sets.slice().sort(function(a,b){return b.weight_kg-a.weight_kg;})[0];
      var sum=top ? ex.sets.length+'×'+top.reps+' — '+top.weight_kg+'kg' : ex.sets.length+' series';
      ctx.fillStyle='#adaaaa'; ctx.font='36px Arial';
      ctx.textAlign='right';
      ctx.fillText(sum, W-P-16, y+48);
    });

    var hidden=data.exercises.length-vis.length;
    if(hidden>0){
      var mY=exY+vis.length*(exH+exGap)+28;
      ctx.fillStyle='#767575'; ctx.font='32px Arial';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('+'+hidden+' ejercicio'+(hidden>1?'s':'')+' más', W/2, mY);
    }

    // 6. Footer
    ctx.fillStyle='#d1fc00'; rr(W/2-64,1830,128,6,3); ctx.fill();
    ctx.fillStyle='#484847'; ctx.font='bold 28px Arial';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('ENTRENADO CON SPOTTER', W/2, 1876);

    var jpg=canvas.toDataURL('image/jpeg',0.92);
    window.ReactNativeWebView.postMessage(JSON.stringify({ok:true,data:jpg}));
  } catch(e) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ok:false,error:String(e)}));
  }
})();
</script>
</body></html>`;
}
