import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { routineSchema, RoutineFormData } from '@/schemas/routine.schema';
import { useCreateRoutine } from '@/hooks/queries/use-routines';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function CreateRoutineScreen() {
  const router = useRouter();
  const createMutation = useCreateRoutine();

  const { control, handleSubmit, formState: { errors } } = useForm<RoutineFormData>({
    resolver: zodResolver(routineSchema),
    defaultValues: { name: '', description: '', days_per_week: undefined },
  });

  const onSubmit = async (data: RoutineFormData) => {
    try {
      const routine = await createMutation.mutateAsync(data);
      Toast.show({ type: 'success', text1: 'Rutina creada' });
      router.replace(`/(tabs)/routines/${routine.id}`);
    } catch {
      Toast.show({ type: 'error', text1: 'Error al crear la rutina' });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={[typography.titleMd, { color: colors.onSurface }]}>Nueva Rutina</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={styles.templateBanner}
            onPress={() => router.replace('/(tabs)/routines/templates')}
            activeOpacity={0.8}
          >
            <Ionicons name="sparkles" size={20} color={colors.primaryContainer} />
            <View style={{ flex: 1 }}>
              <Text style={[typography.titleSm, { color: colors.onSurface }]}>
                Usar una plantilla
              </Text>
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
                18 programas listos para empezar
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.primaryContainer} />
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, paddingHorizontal: 12 }]}>
              o crear desde cero
            </Text>
            <View style={styles.dividerLine} />
          </View>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Nombre"
                placeholder="Ej: Push Day, Piernas, Full Body..."
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Descripción (opcional)"
                placeholder="Breve descripción de la rutina"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={3}
                error={errors.description?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="days_per_week"
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                label="Días por semana (opcional)"
                placeholder="Ej: 3"
                value={value?.toString() ?? ''}
                onChangeText={(v) => onChange(v ? parseInt(v, 10) : undefined)}
                onBlur={onBlur}
                keyboardType="number-pad"
                error={errors.days_per_week?.message}
              />
            )}
          />

          <Button
            label="Crear rutina"
            onPress={handleSubmit(onSubmit)}
            loading={createMutation.isPending}
            style={{ marginTop: 8 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 24,
  },
  form: { padding: 24, gap: 16 },
  templateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryContainer,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
});
