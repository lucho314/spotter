-- ============================================
-- Agregar campos de seguimiento físico al perfil
-- Ejecutar en Supabase SQL Editor
-- ============================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS weight_kg    numeric(5,2),
  ADD COLUMN IF NOT EXISTS height_cm    smallint,
  ADD COLUMN IF NOT EXISTS birth_date   date,
  ADD COLUMN IF NOT EXISTS fitness_goal text;

-- RLS: permitir que el usuario actualice su propio perfil
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS: permitir que el usuario lea su propio perfil
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
