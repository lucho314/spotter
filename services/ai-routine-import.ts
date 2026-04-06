import { supabase } from '@/lib/supabase';

export async function parseRoutineFromImage(params: {
  imageBase64: string;
  imageMimeType: string;
  userId: string;
}): Promise<{ routine_id: string; routine_name: string }> {
  const { data, error } = await supabase.functions.invoke('parse-routine-image', {
    body: {
      image_base64: params.imageBase64,
      image_mime_type: params.imageMimeType,
      user_id: params.userId,
    },
  });

  if (error) {
    // Intentar leer el error real del cuerpo de la respuesta
    const detail = (error as any)?.context?.json?.error ?? error.message;
    throw new Error(detail);
  }
  if (data?.error) throw new Error(data.error);

  return data;
}
