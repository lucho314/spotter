-- =============================================
-- Exercise table reload from ExerciseDB API
-- =============================================

-- Truncate all dependent tables
TRUNCATE TABLE personal_records CASCADE;
TRUNCATE TABLE workout_sets CASCADE;
TRUNCATE TABLE routine_exercises CASCADE;
TRUNCATE TABLE template_day_exercises CASCADE;
TRUNCATE TABLE workout_sessions CASCADE;
TRUNCATE TABLE routines CASCADE;
TRUNCATE TABLE exercises RESTART IDENTITY CASCADE;