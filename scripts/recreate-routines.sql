-- =====================================================
-- Recreate template_day_exercises after exercise reload
-- Uses name_en lookups - works regardless of exercise IDs
-- =====================================================

TRUNCATE TABLE template_day_exercises CASCADE;

-- Fuerza Básica / Day 1: Cuerpo Completo A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 1
  AND td.name_es = 'Cuerpo Completo A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 1
  AND td.name_es = 'Cuerpo Completo A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 1
  AND td.name_es = 'Cuerpo Completo A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 1
  AND td.name_es = 'Cuerpo Completo A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 1
  AND td.name_es = 'Cuerpo Completo A';

-- Fuerza Básica / Day 2: Cuerpo Completo B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 2
  AND td.name_es = 'Cuerpo Completo B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 2
  AND td.name_es = 'Cuerpo Completo B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 2
  AND td.name_es = 'Cuerpo Completo B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Face Pull%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 2
  AND td.name_es = 'Cuerpo Completo B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Crunches%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 2
  AND td.name_es = 'Cuerpo Completo B';

-- Fuerza Básica / Day 3: Cuerpo Completo C
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Goblet Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Back Hyperextension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza Básica'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo C';

-- Fuerza 5/3/1 / Day 1: Día Press Militar
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 1
  AND td.name_es = 'Día Press Militar';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dips%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 1
  AND td.name_es = 'Día Press Militar';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 1
  AND td.name_es = 'Día Press Militar';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 1
  AND td.name_es = 'Día Press Militar';

-- Fuerza 5/3/1 / Day 2: Día Peso Muerto
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 2
  AND td.name_es = 'Día Peso Muerto';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 2
  AND td.name_es = 'Día Peso Muerto';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Back Hyperextension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 2
  AND td.name_es = 'Día Peso Muerto';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 60, 0
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 2
  AND td.name_es = 'Día Peso Muerto';

-- Fuerza 5/3/1 / Day 3: Día Press de Banca
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 3
  AND td.name_es = 'Día Press de Banca';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 3
  AND td.name_es = 'Día Press de Banca';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 3
  AND td.name_es = 'Día Press de Banca';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 3
  AND td.name_es = 'Día Press de Banca';

-- Fuerza 5/3/1 / Day 4: Día Sentadilla
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 4
  AND td.name_es = 'Día Sentadilla';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%45 Degree Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 4
  AND td.name_es = 'Día Sentadilla';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 4
  AND td.name_es = 'Día Sentadilla';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Crunches%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Fuerza 5/3/1'
  AND td.day_number = 4
  AND td.name_es = 'Día Sentadilla';

-- Upper/Lower Fuerza / Day 1: Superior A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';

-- Upper/Lower Fuerza / Day 2: Inferior A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';

-- Upper/Lower Fuerza / Day 3: Superior B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Barbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%T-Bar Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Chin-up%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';

-- Upper/Lower Fuerza / Day 4: Inferior B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hack Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Sumo Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bulgarian Split Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Fuerza'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';

-- Push Pull Piernas 6 días / Day 1: Empuje A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Cable Crossover%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje A';

-- Push Pull Piernas 6 días / Day 2: Tirón A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Face Pull%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hammer Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón A';

-- Push Pull Piernas 6 días / Day 3: Piernas A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';

-- Push Pull Piernas 6 días / Day 4: Empuje B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Barbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 4
  AND td.name_es = 'Empuje B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Flyes%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 4
  AND td.name_es = 'Empuje B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Machine Chest Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 4
  AND td.name_es = 'Empuje B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 4
  AND td.name_es = 'Empuje B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Cable Lateral Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 4
  AND td.name_es = 'Empuje B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Close Grip Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 4
  AND td.name_es = 'Empuje B';

-- Push Pull Piernas 6 días / Day 5: Tirón B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 6, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 5
  AND td.name_es = 'Tirón B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%T-Bar Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 5
  AND td.name_es = 'Tirón B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Cable Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 5
  AND td.name_es = 'Tirón B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Rear Delt Fly%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 5
  AND td.name_es = 'Tirón B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 5
  AND td.name_es = 'Tirón B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Cable Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 5
  AND td.name_es = 'Tirón B';

-- Push Pull Piernas 6 días / Day 6: Piernas B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hack Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%45 Degree Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bulgarian Split Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Glute Bridge%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 6 días'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';

-- Push Pull Piernas 3 días / Day 1: Empuje
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 1
  AND td.name_es = 'Empuje';

-- Push Pull Piernas 3 días / Day 2: Tirón
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Face Pull%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 2
  AND td.name_es = 'Tirón';

-- Push Pull Piernas 3 días / Day 3: Piernas
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Push Pull Piernas 3 días'
  AND td.day_number = 3
  AND td.name_es = 'Piernas';

-- Upper/Lower Hipertrofia / Day 1: Superior A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';

-- Upper/Lower Hipertrofia / Day 2: Inferior A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';

-- Upper/Lower Hipertrofia / Day 3: Superior B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Barbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%T-Bar Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Neutral Grip Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Tricep Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';

-- Upper/Lower Hipertrofia / Day 4: Inferior B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hack Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lunges%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bulgarian Split Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Cable Kickback%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Hipertrofia'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';

-- Bro Split / Day 1: Día Pecho
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 1
  AND td.name_es = 'Día Pecho';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Barbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 1
  AND td.name_es = 'Día Pecho';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Decline Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 1
  AND td.name_es = 'Día Pecho';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Flyes%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 1
  AND td.name_es = 'Día Pecho';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pec Deck Fly%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 1
  AND td.name_es = 'Día Pecho';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dips%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 1
  AND td.name_es = 'Día Pecho';

-- Bro Split / Day 2: Día Espalda
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 2
  AND td.name_es = 'Día Espalda';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 2
  AND td.name_es = 'Día Espalda';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%T-Bar Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 2
  AND td.name_es = 'Día Espalda';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 2
  AND td.name_es = 'Día Espalda';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 2
  AND td.name_es = 'Día Espalda';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Back Hyperextension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 2
  AND td.name_es = 'Día Espalda';

-- Bro Split / Day 3: Día Hombros
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 3
  AND td.name_es = 'Día Hombros';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 3
  AND td.name_es = 'Día Hombros';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 3
  AND td.name_es = 'Día Hombros';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Front Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 3
  AND td.name_es = 'Día Hombros';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Rear Delt Fly%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 3
  AND td.name_es = 'Día Hombros';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Face Pull%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 3
  AND td.name_es = 'Día Hombros';

-- Bro Split / Day 4: Día Piernas
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 4
  AND td.name_es = 'Día Piernas';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%45 Degree Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 4
  AND td.name_es = 'Día Piernas';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 4
  AND td.name_es = 'Día Piernas';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 4
  AND td.name_es = 'Día Piernas';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 4
  AND td.name_es = 'Día Piernas';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 4
  AND td.name_es = 'Día Piernas';

-- Bro Split / Day 5: Día Brazos
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 5
  AND td.name_es = 'Día Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Preacher Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 5
  AND td.name_es = 'Día Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 5
  AND td.name_es = 'Día Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 5
  AND td.name_es = 'Día Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Tricep Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 5
  AND td.name_es = 'Día Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Close Grip Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Bro Split'
  AND td.day_number = 5
  AND td.name_es = 'Día Brazos';

-- Arnold Split / Day 1: Pecho + Espalda A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Espalda A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Espalda A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Barbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Espalda A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Espalda A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Flyes%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Espalda A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Espalda A';

-- Arnold Split / Day 2: Hombros + Brazos A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 2
  AND td.name_es = 'Hombros + Brazos A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 2
  AND td.name_es = 'Hombros + Brazos A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 2
  AND td.name_es = 'Hombros + Brazos A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 2
  AND td.name_es = 'Hombros + Brazos A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 4, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 2
  AND td.name_es = 'Hombros + Brazos A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Arnold Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 2
  AND td.name_es = 'Hombros + Brazos A';

-- Arnold Split / Day 3: Piernas A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%45 Degree Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 3
  AND td.name_es = 'Piernas A';

-- Arnold Split / Day 4: Pecho + Espalda B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Decline Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 4
  AND td.name_es = 'Pecho + Espalda B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Chin-up%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 4
  AND td.name_es = 'Pecho + Espalda B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Flat Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 4
  AND td.name_es = 'Pecho + Espalda B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 4
  AND td.name_es = 'Pecho + Espalda B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pec Deck Fly%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 4
  AND td.name_es = 'Pecho + Espalda B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Neutral Grip Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 4
  AND td.name_es = 'Pecho + Espalda B';

-- Arnold Split / Day 5: Hombros + Brazos B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 5
  AND td.name_es = 'Hombros + Brazos B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 5
  AND td.name_es = 'Hombros + Brazos B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Cable Lateral Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 5
  AND td.name_es = 'Hombros + Brazos B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%EZ Bar Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 5
  AND td.name_es = 'Hombros + Brazos B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 4, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Tricep Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 5
  AND td.name_es = 'Hombros + Brazos B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Close Grip Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 5
  AND td.name_es = 'Hombros + Brazos B';

-- Arnold Split / Day 6: Piernas B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hack Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bulgarian Split Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Cable Kickback%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Arnold Split'
  AND td.day_number = 6
  AND td.name_es = 'Piernas B';

-- Circuito Full Body / Day 1: Circuito A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bodyweight Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 1
  AND td.name_es = 'Circuito A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Push-up%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 1
  AND td.name_es = 'Circuito A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Inverted Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 1
  AND td.name_es = 'Circuito A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Glute Bridge%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 1
  AND td.name_es = 'Circuito A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 20, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Mountain Climbers%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 1
  AND td.name_es = 'Circuito A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 10, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Burpees%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 1
  AND td.name_es = 'Circuito A';

-- Circuito Full Body / Day 2: Circuito B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 12, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Walking Lunges%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 2
  AND td.name_es = 'Circuito B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Diamond Push-up%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 2
  AND td.name_es = 'Circuito B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 2
  AND td.name_es = 'Circuito B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 2
  AND td.name_es = 'Circuito B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 45, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 2
  AND td.name_es = 'Circuito B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 1, 60, 0
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Jump Rope%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 2
  AND td.name_es = 'Circuito B';

-- Circuito Full Body / Day 3: Circuito C
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 12, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 3
  AND td.name_es = 'Circuito C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Flat Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 3
  AND td.name_es = 'Circuito C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Chin-up%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 3
  AND td.name_es = 'Circuito C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lunges%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 3
  AND td.name_es = 'Circuito C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 20, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Russian Twist%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 3
  AND td.name_es = 'Circuito C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 10, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Burpees%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Circuito Full Body'
  AND td.day_number = 3
  AND td.name_es = 'Circuito C';

-- Upper/Lower Quema Grasa / Day 1: Superior A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Machine Chest Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Machine Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 1
  AND td.name_es = 'Superior A';

-- Upper/Lower Quema Grasa / Day 2: Inferior A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bodyweight Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%45 Degree Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lunges%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Glute Bridge%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 20, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Mountain Climbers%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 2
  AND td.name_es = 'Inferior A';

-- Upper/Lower Quema Grasa / Day 3: Superior B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Push-up%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Inverted Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Neutral Grip Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Rear Delt Fly%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 20, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Crunches%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 3
  AND td.name_es = 'Superior B';

-- Upper/Lower Quema Grasa / Day 4: Inferior B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Goblet Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Walking Lunges%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Cable Kickback%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 20, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Russian Twist%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Upper/Lower Quema Grasa'
  AND td.day_number = 4
  AND td.name_es = 'Inferior B';

-- Full Body Principiante / Day 1: Día A
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Machine Chest Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Machine Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bodyweight Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 30, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A';

-- Full Body Principiante / Day 2: Día B
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Push-up%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Inverted Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Goblet Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Crunches%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B';

-- Full Body Principiante / Day 3: Día C
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Machine Dips%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%45 Degree Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Glute Bridge%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 30, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Side Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C';

-- Full Body Mínimo / Day 1: Día 1
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 10, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Mínimo'
  AND td.day_number = 1
  AND td.name_es = 'Día 1';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 10, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Mínimo'
  AND td.day_number = 1
  AND td.name_es = 'Día 1';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 10, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Mínimo'
  AND td.day_number = 1
  AND td.name_es = 'Día 1';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 30, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Mínimo'
  AND td.day_number = 1
  AND td.name_es = 'Día 1';

-- Full Body Mínimo / Day 2: Día 2
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Mínimo'
  AND td.day_number = 2
  AND td.name_es = 'Día 2';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 10, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Mínimo'
  AND td.day_number = 2
  AND td.name_es = 'Día 2';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Mínimo'
  AND td.day_number = 2
  AND td.name_es = 'Día 2';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Mínimo'
  AND td.day_number = 2
  AND td.name_es = 'Día 2';

-- Full Body Hipertrofia 3 días — Principiante / Day 1: Empuje + Cuádriceps + Core
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Machine Chest Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Empuje + Cuádriceps + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 15, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bodyweight Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Empuje + Cuádriceps + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Seated Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Empuje + Cuádriceps + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Empuje + Cuádriceps + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Dips%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Empuje + Cuádriceps + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Crunches%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Empuje + Cuádriceps + Core';

-- Full Body Hipertrofia 3 días — Principiante / Day 2: Tirón + Cadena Posterior + Bíceps
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior + Bíceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Machine Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior + Bíceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior + Bíceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Glute Bridge%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior + Bíceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior + Bíceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 30, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior + Bíceps';

-- Full Body Hipertrofia 3 días — Principiante / Day 3: Cuerpo Completo + Hombros + Brazos
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Hombros + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Flat Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Hombros + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Hombros + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Hombros + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hammer Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Hombros + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Hombros + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 20, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Russian Twist%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Hombros + Brazos';

-- Full Body Hipertrofia 3 días — Intermedio / Day 1: Pecho + Hombros + Tríceps + Cuádriceps
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 10, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Arnold Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  8, 3, 15, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Crunches%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';

-- Full Body Hipertrofia 3 días — Intermedio / Day 2: Espalda + Bíceps + Glúteos + Isquiotibiales
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 6, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Face Pull%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  8, 3, 45, 45
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';

-- Full Body Hipertrofia 3 días — Intermedio / Day 3: Cuerpo Completo + Brazos + Core
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bulgarian Split Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Brazos + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Close Grip Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Brazos + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lat Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Brazos + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Brazos + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Brazos + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Preacher Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Brazos + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Tricep Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Brazos + Core';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  8, 3, 10, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Ab Wheel Rollout%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Brazos + Core';

-- Full Body Hipertrofia 3 días — Avanzado / Day 1: Pecho + Hombros + Tríceps + Cuádriceps
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 6, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Barbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hack Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 4, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Arnold Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Skull Crushers%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  8, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Pecho + Hombros + Tríceps + Cuádriceps';

-- Full Body Hipertrofia 3 días — Avanzado / Day 2: Espalda + Bíceps + Glúteos + Isquiotibiales
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Neutral Grip Pulldown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Face Pull%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  8, 4, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%EZ Bar Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  9, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Espalda + Bíceps + Glúteos + Isquiotibiales';

-- Full Body Hipertrofia 3 días — Avanzado / Day 3: Cuerpo Completo + Core + Brazos
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Front Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Flat Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%T-Bar Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 10, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 12, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 21, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%21s Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  8, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Diamond Push-up%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  9, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Ab Wheel Rollout%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  10, 3, 10, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hanging Leg Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Hipertrofia 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Cuerpo Completo + Core + Brazos';

-- Full Body Fuerza 3 días — Principiante / Day 1: Día A — Sentadilla + Banca + Remo
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A — Sentadilla + Banca + Remo';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A — Sentadilla + Banca + Remo';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A — Sentadilla + Banca + Remo';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A — Sentadilla + Banca + Remo';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 30, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 1
  AND td.name_es = 'Día A — Sentadilla + Banca + Remo';

-- Full Body Fuerza 3 días — Principiante / Day 2: Día B — Sentadilla + Militar + Peso Muerto
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B — Sentadilla + Militar + Peso Muerto';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B — Sentadilla + Militar + Peso Muerto';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 1, 5, 240
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B — Sentadilla + Militar + Peso Muerto';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 5, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B — Sentadilla + Militar + Peso Muerto';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Crunches%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 2
  AND td.name_es = 'Día B — Sentadilla + Militar + Peso Muerto';

-- Full Body Fuerza 3 días — Principiante / Day 3: Día C — Sentadilla + Banca + Jalón + Brazos
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C — Sentadilla + Banca + Jalón + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C — Sentadilla + Banca + Jalón + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C — Sentadilla + Banca + Jalón + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C — Sentadilla + Banca + Jalón + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 8, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C — Sentadilla + Banca + Jalón + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 8, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C — Sentadilla + Banca + Jalón + Brazos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 30, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Plank%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Principiante'
  AND td.day_number = 3
  AND td.name_es = 'Día C — Sentadilla + Banca + Jalón + Brazos';

-- Full Body Fuerza 3 días — Intermedio / Day 1: Sentadilla + Press Banca + Accesorios
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Sentadilla + Press Banca + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Sentadilla + Press Banca + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Sentadilla + Press Banca + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Dumbbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Sentadilla + Press Banca + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 12, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Lateral Raises%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Sentadilla + Press Banca + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 10, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Tricep Pushdown%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Sentadilla + Press Banca + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 10, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 1
  AND td.name_es = 'Sentadilla + Press Banca + Accesorios';

-- Full Body Fuerza 3 días — Intermedio / Day 2: Peso Muerto + Militar + Tirón
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 4, 210
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Peso Muerto + Militar + Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Peso Muerto + Militar + Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Peso Muerto + Militar + Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dumbbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Peso Muerto + Militar + Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Peso Muerto + Militar + Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 8, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Peso Muerto + Militar + Tirón';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Face Pull%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 2
  AND td.name_es = 'Peso Muerto + Militar + Tirón';

-- Full Body Fuerza 3 días — Intermedio / Day 3: Variaciones + Accesorios Completos
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hack Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones + Accesorios Completos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Barbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones + Accesorios Completos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%T-Bar Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones + Accesorios Completos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Romanian Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones + Accesorios Completos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Arnold Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones + Accesorios Completos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 21, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%21s Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones + Accesorios Completos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 8, 75
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Skull Crushers%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones + Accesorios Completos';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  8, 3, 10, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Kneeling Ab Wheel%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Intermedio'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones + Accesorios Completos';

-- Full Body Fuerza 3 días — Avanzado / Day 1: Piernas + Empuje Pesado
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 4, 210
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Piernas + Empuje Pesado';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 3, 210
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bench Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Piernas + Empuje Pesado';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Leg Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Piernas + Empuje Pesado';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Incline Barbell Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Piernas + Empuje Pesado';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 5, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Piernas + Empuje Pesado';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Dips%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Piernas + Empuje Pesado';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 4, 10, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Standing Calf Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 1
  AND td.name_es = 'Piernas + Empuje Pesado';

-- Full Body Fuerza 3 días — Avanzado / Day 2: Tirón + Cadena Posterior Pesada
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 5, 3, 240
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior Pesada';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 5, 5, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Pull-ups%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior Pesada';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior Pesada';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 4, 6, 150
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hip Thrust%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior Pesada';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 15, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Face Pull%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior Pesada';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 4, 6, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Barbell Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior Pesada';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 40, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Farmer Walk%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 2
  AND td.name_es = 'Tirón + Cadena Posterior Pesada';

-- Full Body Fuerza 3 días — Avanzado / Day 3: Variaciones Full Body + Accesorios
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  1, 4, 4, 210
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Front Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  2, 4, 4, 210
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Sumo Deadlift%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  3, 4, 5, 180
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%T-Bar Row%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  4, 3, 8, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Arnold Press%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  5, 3, 6, 120
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Bulgarian Split Squat%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  6, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Preacher Curl%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  7, 3, 8, 90
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Overhead Tricep Extension%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  8, 4, 10, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Ab Wheel Rollout%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';
INSERT INTO template_day_exercises (template_day_id, exercise_id, sort_order, target_sets, target_reps, rest_seconds)
SELECT
  td.id,
  e.id,
  9, 3, 8, 60
FROM template_days td
JOIN routine_templates rt ON rt.id = td.template_id
CROSS JOIN LATERAL (
  SELECT id FROM exercises WHERE name_en ILIKE '%Hanging Leg Raise%' ORDER BY length(name_en) LIMIT 1
) e
WHERE rt.name_es = 'Full Body Fuerza 3 días — Avanzado'
  AND td.day_number = 3
  AND td.name_es = 'Variaciones Full Body + Accesorios';

