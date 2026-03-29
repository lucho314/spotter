-- ============================================
-- SPOTTER MVP - Schema SQL para Supabase
-- Ejecutar en orden: 01_schema.sql → 02_rls.sql
-- ============================================

-- 1. Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Funcion para auto-actualizar updated_at (reemplaza moddatetime que no esta disponible en Supabase)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Enums
CREATE TYPE equipment_type AS ENUM (
  'barbell', 'dumbbell', 'machine', 'cable', 'bodyweight', 'kettlebell', 'band', 'other'
);

CREATE TYPE session_status AS ENUM (
  'in_progress', 'completed', 'cancelled'
);

-- ============================================
-- 3. Tablas
-- ============================================

-- PROFILES
CREATE TABLE profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  avatar_url   text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- MUSCLE_GROUPS (global seed data)
CREATE TABLE muscle_groups (
  id      smallint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name    text NOT NULL UNIQUE,
  name_en text NOT NULL
);
ALTER TABLE muscle_groups ENABLE ROW LEVEL SECURITY;

-- EXERCISES (global catalog)
CREATE TABLE exercises (
  id              integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name            text NOT NULL,
  name_en         text NOT NULL,
  muscle_group_id smallint NOT NULL REFERENCES muscle_groups(id),
  equipment       equipment_type NOT NULL DEFAULT 'barbell',
  image_url       text
);
CREATE INDEX idx_exercises_muscle_group ON exercises(muscle_group_id);
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- ROUTINES
CREATE TABLE routines (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          text NOT NULL,
  description   text,
  days_per_week smallint CHECK (days_per_week BETWEEN 1 AND 7),
  is_archived   boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_routines_user ON routines(user_id) WHERE NOT is_archived;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER set_routines_updated_at
  BEFORE UPDATE ON routines
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ROUTINE_EXERCISES
CREATE TABLE routine_exercises (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id   uuid NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  exercise_id  integer NOT NULL REFERENCES exercises(id),
  sort_order   smallint NOT NULL DEFAULT 0,
  target_sets  smallint NOT NULL DEFAULT 3,
  target_reps  smallint NOT NULL DEFAULT 10,
  rest_seconds smallint NOT NULL DEFAULT 90,
  UNIQUE (routine_id, exercise_id)
);
CREATE INDEX idx_re_routine ON routine_exercises(routine_id, sort_order);
ALTER TABLE routine_exercises ENABLE ROW LEVEL SECURITY;

-- WORKOUT_SESSIONS
CREATE TABLE workout_sessions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  routine_id   uuid REFERENCES routines(id) ON DELETE SET NULL,
  started_at   timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  notes        text,
  status       session_status NOT NULL DEFAULT 'in_progress'
);
CREATE INDEX idx_ws_user_date ON workout_sessions(user_id, started_at DESC);
CREATE INDEX idx_ws_in_progress ON workout_sessions(user_id, status) WHERE status = 'in_progress';
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;

-- WORKOUT_SETS
CREATE TABLE workout_sets (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   uuid NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
  exercise_id  integer NOT NULL REFERENCES exercises(id),
  set_number   smallint NOT NULL,
  weight_kg    numeric(6,2) NOT NULL CHECK (weight_kg >= 0),
  reps         smallint NOT NULL CHECK (reps > 0),
  rpe          numeric(3,1) CHECK (rpe BETWEEN 1 AND 10),
  is_warmup    boolean NOT NULL DEFAULT false,
  completed_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_wsets_session ON workout_sets(session_id, exercise_id, set_number);
CREATE INDEX idx_wsets_exercise_progress ON workout_sets(exercise_id, completed_at DESC);
ALTER TABLE workout_sets ENABLE ROW LEVEL SECURITY;

-- PERSONAL_RECORDS (cache desnormalizada, actualizada via trigger)
CREATE TABLE personal_records (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exercise_id         integer NOT NULL REFERENCES exercises(id),
  best_weight_kg      numeric(6,2) NOT NULL,
  best_reps_at_weight smallint NOT NULL,
  estimated_1rm       numeric(6,2) NOT NULL,
  achieved_at         timestamptz NOT NULL,
  updated_at          timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, exercise_id)
);
CREATE INDEX idx_pr_user ON personal_records(user_id);
ALTER TABLE personal_records ENABLE ROW LEVEL SECURITY;

-- SHARED_ROUTINES
CREATE TABLE shared_routines (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id  uuid NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  shared_by   uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  share_code  text NOT NULL UNIQUE,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  expires_at  timestamptz
);
CREATE INDEX idx_shared_code ON shared_routines(share_code) WHERE is_active;
ALTER TABLE shared_routines ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. Funciones y Triggers
-- ============================================

-- Auto-crear perfil al registrarse
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-actualizar PRs al insertar un set (formula Epley: weight * (1 + reps/30))
CREATE OR REPLACE FUNCTION update_personal_record()
RETURNS trigger AS $$
DECLARE
  v_user_id uuid;
  v_estimated_1rm numeric(6,2);
BEGIN
  SELECT user_id INTO v_user_id
  FROM workout_sessions WHERE id = NEW.session_id;

  v_estimated_1rm := NEW.weight_kg * (1 + NEW.reps::numeric / 30);

  INSERT INTO personal_records (user_id, exercise_id, best_weight_kg, best_reps_at_weight, estimated_1rm, achieved_at)
  VALUES (v_user_id, NEW.exercise_id, NEW.weight_kg, NEW.reps, v_estimated_1rm, NEW.completed_at)
  ON CONFLICT (user_id, exercise_id)
  DO UPDATE SET
    best_weight_kg = EXCLUDED.best_weight_kg,
    best_reps_at_weight = EXCLUDED.best_reps_at_weight,
    estimated_1rm = EXCLUDED.estimated_1rm,
    achieved_at = EXCLUDED.achieved_at,
    updated_at = now()
  WHERE EXCLUDED.estimated_1rm > personal_records.estimated_1rm;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_workout_set_inserted
  AFTER INSERT ON workout_sets
  FOR EACH ROW WHEN (NOT NEW.is_warmup)
  EXECUTE FUNCTION update_personal_record();

-- Generar share code unico automaticamente
CREATE OR REPLACE FUNCTION generate_share_code()
RETURNS trigger AS $$
BEGIN
  IF NEW.share_code IS NULL THEN
    NEW.share_code := encode(gen_random_bytes(6), 'hex');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_share_code
  BEFORE INSERT ON shared_routines
  FOR EACH ROW EXECUTE FUNCTION generate_share_code();

-- ============================================
-- 5. Seed Data
-- ============================================

INSERT INTO muscle_groups (name, name_en) VALUES
  ('Pecho', 'Chest'),
  ('Espalda', 'Back'),
  ('Hombros', 'Shoulders'),
  ('Biceps', 'Biceps'),
  ('Triceps', 'Triceps'),
  ('Piernas', 'Legs'),
  ('Gluteos', 'Glutes'),
  ('Core', 'Core'),
  ('Antebrazos', 'Forearms'),
  ('Cardio', 'Cardio');

INSERT INTO exercises (name, name_en, muscle_group_id, equipment) VALUES
  -- Pecho (1)
  ('Press de Banca', 'Bench Press', 1, 'barbell'),
  ('Press Inclinado con Mancuernas', 'Incline Dumbbell Press', 1, 'dumbbell'),
  ('Aperturas con Mancuernas', 'Dumbbell Flyes', 1, 'dumbbell'),
  ('Fondos en Paralelas', 'Dips', 1, 'bodyweight'),
  ('Crossover en Polea', 'Cable Crossover', 1, 'cable'),
  -- Espalda (2)
  ('Peso Muerto', 'Deadlift', 2, 'barbell'),
  ('Dominadas', 'Pull-ups', 2, 'bodyweight'),
  ('Remo con Barra', 'Barbell Row', 2, 'barbell'),
  ('Remo con Mancuerna', 'Dumbbell Row', 2, 'dumbbell'),
  ('Jalon al Pecho', 'Lat Pulldown', 2, 'cable'),
  ('Remo en Polea Baja', 'Seated Cable Row', 2, 'cable'),
  -- Hombros (3)
  ('Press Militar', 'Overhead Press', 3, 'barbell'),
  ('Elevaciones Laterales', 'Lateral Raises', 3, 'dumbbell'),
  ('Face Pull', 'Face Pull', 3, 'cable'),
  ('Press Arnold', 'Arnold Press', 3, 'dumbbell'),
  -- Biceps (4)
  ('Curl con Barra', 'Barbell Curl', 4, 'barbell'),
  ('Curl con Mancuernas', 'Dumbbell Curl', 4, 'dumbbell'),
  ('Curl Martillo', 'Hammer Curl', 4, 'dumbbell'),
  -- Triceps (5)
  ('Extension de Triceps en Polea', 'Tricep Pushdown', 5, 'cable'),
  ('Press Frances', 'Skull Crushers', 5, 'barbell'),
  ('Fondos en Banco', 'Bench Dips', 5, 'bodyweight'),
  -- Piernas (6)
  ('Sentadilla con Barra', 'Barbell Squat', 6, 'barbell'),
  ('Prensa de Piernas', 'Leg Press', 6, 'machine'),
  ('Extension de Piernas', 'Leg Extension', 6, 'machine'),
  ('Curl de Piernas', 'Leg Curl', 6, 'machine'),
  ('Zancadas', 'Lunges', 6, 'dumbbell'),
  ('Sentadilla Bulgara', 'Bulgarian Split Squat', 6, 'dumbbell'),
  -- Gluteos (7)
  ('Hip Thrust', 'Hip Thrust', 7, 'barbell'),
  ('Peso Muerto Rumano', 'Romanian Deadlift', 7, 'barbell'),
  -- Core (8)
  ('Plancha', 'Plank', 8, 'bodyweight'),
  ('Crunch con Polea', 'Cable Crunch', 8, 'cable'),
  ('Rueda Abdominal', 'Ab Wheel Rollout', 8, 'other');
