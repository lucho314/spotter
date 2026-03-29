-- ============================================
-- SPOTTER MVP - Politicas RLS para Supabase
-- Ejecutar despues de 01_schema.sql
-- ============================================

-- PROFILES: cada usuario solo ve y edita su propio perfil
-- INSERT lo maneja el trigger handle_new_user (SECURITY DEFINER)
-- DELETE no permitido
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- MUSCLE_GROUPS: lectura global, nadie modifica via app
CREATE POLICY "muscle_groups_select_all"
  ON muscle_groups FOR SELECT
  USING (true);

-- EXERCISES: lectura global, nadie modifica via app
CREATE POLICY "exercises_select_all"
  ON exercises FOR SELECT
  USING (true);

-- ROUTINES: CRUD solo propietario
CREATE POLICY "routines_select_own"
  ON routines FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "routines_insert_own"
  ON routines FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "routines_update_own"
  ON routines FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "routines_delete_own"
  ON routines FOR DELETE
  USING (auth.uid() = user_id);

-- ROUTINE_EXERCISES: acceso via ownership de la rutina padre
-- No se puede insertar en una rutina ajena aunque se envie el routine_id correcto
CREATE POLICY "re_select"
  ON routine_exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_exercises.routine_id
        AND routines.user_id = auth.uid()
    )
  );

CREATE POLICY "re_insert"
  ON routine_exercises FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_exercises.routine_id
        AND routines.user_id = auth.uid()
    )
  );

CREATE POLICY "re_update"
  ON routine_exercises FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_exercises.routine_id
        AND routines.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_exercises.routine_id
        AND routines.user_id = auth.uid()
    )
  );

CREATE POLICY "re_delete"
  ON routine_exercises FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_exercises.routine_id
        AND routines.user_id = auth.uid()
    )
  );

-- WORKOUT_SESSIONS: solo propietario, sin DELETE (datos historicos permanentes)
CREATE POLICY "sessions_select_own"
  ON workout_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "sessions_insert_own"
  ON workout_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "sessions_update_own"
  ON workout_sessions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- WORKOUT_SETS: acceso via ownership de la sesion padre, sin DELETE
CREATE POLICY "sets_select"
  ON workout_sets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workout_sessions
      WHERE workout_sessions.id = workout_sets.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "sets_insert"
  ON workout_sets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_sessions
      WHERE workout_sessions.id = workout_sets.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "sets_update"
  ON workout_sets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM workout_sessions
      WHERE workout_sessions.id = workout_sets.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_sessions
      WHERE workout_sessions.id = workout_sets.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  );

-- PERSONAL_RECORDS: solo lectura por el usuario
-- INSERT/UPDATE lo maneja el trigger update_personal_record (SECURITY DEFINER)
CREATE POLICY "pr_select_own"
  ON personal_records FOR SELECT
  USING (auth.uid() = user_id);

-- SHARED_ROUTINES:
-- El creador puede gestionar sus propios compartidos
CREATE POLICY "shared_select_own"
  ON shared_routines FOR SELECT
  USING (auth.uid() = shared_by);

CREATE POLICY "shared_insert_own"
  ON shared_routines FOR INSERT
  WITH CHECK (auth.uid() = shared_by);

CREATE POLICY "shared_update_own"
  ON shared_routines FOR UPDATE
  USING (auth.uid() = shared_by)
  WITH CHECK (auth.uid() = shared_by);

-- Cualquier usuario autenticado puede leer rutinas activas por share_code (para importar)
CREATE POLICY "shared_select_by_code"
  ON shared_routines FOR SELECT
  USING (is_active = true);


CREATE POLICY "Users can delete their own sessions"                                                                                                                     
  ON workout_sessions FOR DELETE                                                                                                                                          
  USING (auth.uid() = user_id);  