import { z } from 'zod';

export const routineSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(50, 'Máximo 50 caracteres'),
  description: z.string().max(200, 'Máximo 200 caracteres').optional(),
  days_per_week: z.number().min(1).max(7).optional(),
});

export type RoutineFormData = z.infer<typeof routineSchema>;
