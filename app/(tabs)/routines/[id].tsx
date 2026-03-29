import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { ExerciseListItem } from '@/components/routines/exercise-list-item';
import { useRoutine, useRemoveExercise } from '@/hooks/queries/use-routines';
import { useWorkoutStore } from '@/stores/workout-store';
import { useAuth } from '@/lib/auth';
import { shareRoutine } from '@/services/sharing';
import { RoutineExercise } from '@/types';

export default function RoutineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { data: routine, isLoading } = useRoutine(id);
  const removeExerciseMutation = useRemoveExercise(id);
  const startWorkout = useWorkoutStore((s) => s.startWorkout);
  const [sharing, setSharing] = useState(false);

  const handleStartWorkout = () => {
    if (!routine?.routine_exercises?.length) {
      Toast.show({ type: 'error', text1: 'Agregá ejercicios primero' });
      return;
    }
    startWorkout(id, routine.routine_exercises as RoutineExercise[], user!.id);
    router.push(`/workout/${id}`);
  };

  const handleRemoveExercise = (item: RoutineExercise) => {
    Alert.alert(
      'Eliminar ejercicio',
      `¿Eliminás "${item.exercises?.name}" de la rutina?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => removeExerciseMutation.mutate(item.id),
        },
      ]
    );
  };

  const handleShare = async () => {
    if (!user) return;
    setSharing(true);
    try {
      const shared = await shareRoutine(id, user.id);
      const message = `Te comparto mi rutina "${routine?.name}" en Spotter 💪\nCódigo: ${shared.share_code}`;

      const result = await Share.share({ message });
      if (result.action === Share.dismissedAction) {
        // User dismissed — copy code to clipboard as fallback
        await Clipboard.setStringAsync(shared.share_code);
        Toast.show({ type: 'success', text1: 'Código copiado', text2: shared.share_code });
      }
    } catch {
      Toast.show({ type: 'error', text1: 'Error al compartir' });
    } finally {
      setSharing(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const exercises = (routine?.routine_exercises ?? []) as RoutineExercise[];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[typography.titleMd, { color: colors.onSurface, flex: 1, marginLeft: 12 }]} numberOfLines={1}>
          {routine?.name}
        </Text>
        <TouchableOpacity
          onPress={handleShare}
          disabled={sharing}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="share-outline" size={22} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/(tabs)/routines/add-exercise', params: { routineId: id } })}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.primaryContainer} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {routine?.description ? (
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>
            {routine.description}
          </Text>
        ) : null}

        {exercises.length === 0 ? (
          <View style={styles.emptyExercises}>
            <Ionicons name="add-circle-outline" size={40} color={colors.outlineVariant} />
            <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 12 }]}>
              Sin ejercicios
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 }]}>
              Tocá el + para agregar ejercicios a tu rutina
            </Text>
          </View>
        ) : (
          <View style={styles.exerciseList}>
            {exercises
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((item) => (
                <ExerciseListItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemoveExercise(item)}
                />
              ))}
          </View>
        )}
      </ScrollView>

      {exercises.length > 0 && (
        <View style={styles.footer}>
          <Button
            label="Iniciar Entrenamiento"
            onPress={handleStartWorkout}
            size="lg"
            style={{ width: '100%' }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 24,
  },
  content: { padding: 24, paddingTop: 0, flexGrow: 1 },
  exerciseList: { gap: 10 },
  emptyExercises: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
  footer: { padding: 24, paddingTop: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
