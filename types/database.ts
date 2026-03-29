export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'kettlebell'
  | 'band'
  | 'other';

export type SessionStatus = 'in_progress' | 'completed' | 'cancelled';

export type FitnessGoal = 'strength' | 'hypertrophy' | 'fat_loss' | 'general';

export type TemplateDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ExerciseCategory = 'compound' | 'isolation' | 'cardio' | 'stretch' | 'plyometric';

export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MuscleGroup {
  id: number;
  name: string;
  name_en: string;
}

export interface Exercise {
  id: number;
  name: string;
  name_en: string;
  muscle_group_id: number;
  equipment: EquipmentType;
  image_url: string | null;
  gif_url: string | null;
  secondary_muscles: string[];
  instructions: string[];
  difficulty: ExerciseDifficulty | null;
  category: ExerciseCategory | null;
  exercisedb_id: string | null;
  muscle_groups?: MuscleGroup;
}

export interface Routine {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  days_per_week: number | null;
  is_archived: boolean;
  source_template_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoutineTemplate {
  id: string;
  name: string;
  name_es: string;
  description: string | null;
  description_es: string | null;
  goal: FitnessGoal;
  difficulty: TemplateDifficulty;
  days_per_week: number;
  is_active: boolean;
  sort_order: number;
  template_days?: TemplateDay[];
}

export interface TemplateDay {
  id: string;
  template_id: string;
  day_number: number;
  name: string;
  name_es: string;
  description: string | null;
  template_day_exercises?: TemplateDayExercise[];
}

export interface TemplateDayExercise {
  id: string;
  template_day_id: string;
  exercise_id: number;
  sort_order: number;
  target_sets: number;
  target_reps: number;
  rest_seconds: number;
  notes: string | null;
  exercises?: Exercise;
}

export interface RoutineExercise {
  id: string;
  routine_id: string;
  exercise_id: number;
  sort_order: number;
  target_sets: number;
  target_reps: number;
  rest_seconds: number;
  exercises?: Exercise;
}

export interface WorkoutSession {
  id: string;
  user_id: string;
  routine_id: string | null;
  started_at: string;
  completed_at: string | null;
  notes: string | null;
  status: SessionStatus;
  routines?: Pick<Routine, 'id' | 'name'>;
}

export interface WorkoutSet {
  id: string;
  session_id: string;
  exercise_id: number;
  set_number: number;
  weight_kg: number;
  reps: number;
  rpe: number | null;
  is_warmup: boolean;
  completed_at: string;
  exercises?: Exercise;
}

export interface PersonalRecord {
  id: string;
  user_id: string;
  exercise_id: number;
  best_weight_kg: number;
  best_reps_at_weight: number;
  estimated_1rm: number;
  achieved_at: string;
  updated_at: string;
  exercises?: Exercise;
}

export interface SharedRoutine {
  id: string;
  routine_id: string;
  shared_by: string;
  share_code: string;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
}
