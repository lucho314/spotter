import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoutineExercise } from '@/types';

export interface ActiveSet {
  set_number: number;
  weight_kg: string;
  reps: string;
  completed: boolean;
  is_warmup: boolean;
}

export interface ActiveExercise {
  routine_exercise: RoutineExercise;
  sets: ActiveSet[];
}

interface WorkoutStore {
  /** Locally generated ID — not a Supabase UUID */
  sessionId: string | null;
  userId: string | null;
  routineId: string | null;
  exercises: ActiveExercise[];
  currentExerciseIndex: number;
  startedAt: number | null;
  isActive: boolean;

  startWorkout: (routineId: string, exercises: RoutineExercise[], userId: string) => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  updateSet: (exerciseIndex: number, setIndex: number, data: Partial<Pick<ActiveSet, 'weight_kg' | 'reps' | 'is_warmup'>>) => void;
  addSet: (exerciseIndex: number) => void;
  setCurrentExercise: (index: number) => void;
  finishWorkout: () => void;
}

function generateLocalId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      sessionId: null,
      userId: null,
      routineId: null,
      exercises: [],
      currentExerciseIndex: 0,
      startedAt: null,
      isActive: false,

      startWorkout: (routineId, routineExercises, userId) => {
        const exercises: ActiveExercise[] = routineExercises.map((re) => ({
          routine_exercise: re,
          sets: Array.from({ length: re.target_sets }, (_, i) => ({
            set_number: i + 1,
            weight_kg: '',
            reps: String(re.target_reps),
            completed: false,
            is_warmup: false,
          })),
        }));

        set({
          sessionId: generateLocalId(),
          userId,
          routineId,
          exercises,
          currentExerciseIndex: 0,
          startedAt: Date.now(),
          isActive: true,
        });
      },

      completeSet: (exerciseIndex, setIndex) => {
        const exercises = get().exercises.map((ex, ei) => {
          if (ei !== exerciseIndex) return ex;
          return {
            ...ex,
            sets: ex.sets.map((s, si) =>
              si === setIndex ? { ...s, completed: true } : s
            ),
          };
        });
        set({ exercises });
      },

      updateSet: (exerciseIndex, setIndex, data) => {
        const exercises = get().exercises.map((ex, ei) => {
          if (ei !== exerciseIndex) return ex;
          return {
            ...ex,
            sets: ex.sets.map((s, si) =>
              si === setIndex ? { ...s, ...data } : s
            ),
          };
        });
        set({ exercises });
      },

      addSet: (exerciseIndex) => {
        const exercises = get().exercises.map((ex, ei) => {
          if (ei !== exerciseIndex) return ex;
          const lastSet = ex.sets[ex.sets.length - 1];
          return {
            ...ex,
            sets: [
              ...ex.sets,
              {
                set_number: ex.sets.length + 1,
                weight_kg: lastSet?.weight_kg ?? '',
                reps: lastSet?.reps ?? '10',
                completed: false,
                is_warmup: false,
              },
            ],
          };
        });
        set({ exercises });
      },

      setCurrentExercise: (index) => set({ currentExerciseIndex: index }),

      finishWorkout: () =>
        set({
          sessionId: null,
          userId: null,
          routineId: null,
          exercises: [],
          currentExerciseIndex: 0,
          startedAt: null,
          isActive: false,
        }),
    }),
    {
      name: 'spotter-workout',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
