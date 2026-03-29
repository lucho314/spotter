import { z } from 'zod';

export const workoutSetSchema = z.object({
  weight_kg: z.number().min(0, 'El peso no puede ser negativo'),
  reps: z.number().int().min(1, 'Mínimo 1 repetición'),
  rpe: z.number().min(1).max(10).optional(),
  is_warmup: z.boolean().default(false),
});

export type WorkoutSetFormData = z.infer<typeof workoutSetSchema>;
