import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { SessionTimer } from '@/components/workout/session-timer';
import { RestTimer } from '@/components/workout/rest-timer';
import { SetRow } from '@/components/workout/set-row';
import { useWorkoutStore } from '@/stores/workout-store';
import { saveWorkout, queueWorkout, PendingWorkout } from '@/services/workout-sync';

function ExerciseVideo({ uri }: { uri: string }) {
  return (
    <Image
      source={{ uri }}
      style={styles.exerciseGif}
      contentFit="contain"
    />
  );
}

export default function WorkoutScreen() {
  const { routineId } = useLocalSearchParams<{ routineId: string }>();
  const router = useRouter();
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restSeconds, setRestSeconds] = useState(90);
  const [saving, setSaving] = useState(false);

  const {
    sessionId,
    userId,
    exercises,
    currentExerciseIndex,
    startedAt,
    isActive,
    completeSet,
    updateSet,
    addSet,
    setCurrentExercise,
    finishWorkout,
  } = useWorkoutStore();

  const currentExercise = exercises[currentExerciseIndex];

  const handleCompleteSet = useCallback((setIndex: number) => {
    const set = currentExercise?.sets[setIndex];
    if (!set || !currentExercise) return;

    const weight = parseFloat(set.weight_kg);
    const reps = parseInt(set.reps, 10);
    if (isNaN(weight) || isNaN(reps) || reps <= 0) {
      Toast.show({ type: 'error', text1: 'Ingresá peso y repeticiones' });
      return;
    }

    completeSet(currentExerciseIndex, setIndex);

    const restSecs = currentExercise.routine_exercise.rest_seconds ?? 90;
    setRestSeconds(restSecs);
    setShowRestTimer(true);
  }, [currentExercise, currentExerciseIndex, completeSet]);

  const completedSetsCount = exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.completed).length, 0
  );

  const handleFinish = () => {
    const message = completedSetsCount === 0
      ? '⚠️ No registraste ninguna serie. Presioná el ✓ en cada serie para guardarla. ¿Finalizar igual?'
      : '¿Terminaste tu sesión?';

    Alert.alert(
      'Finalizar entrenamiento',
      message,
      [
        { text: 'Volver', style: 'cancel' },
        {
          text: 'Finalizar',
          onPress: async () => {
            if (!sessionId || !userId) return;
            setSaving(true);

            const completedAt = new Date().toISOString();
            const sets = exercises.flatMap((ex) =>
              ex.sets
                .filter((s) => s.completed)
                .map((s) => ({
                  exercise_id: ex.routine_exercise.exercise_id,
                  set_number: s.set_number,
                  weight_kg: parseFloat(s.weight_kg) || 0,
                  reps: parseInt(s.reps, 10) || 0,
                  is_warmup: s.is_warmup,
                }))
            );

            const workout: PendingWorkout = {
              localId: sessionId,
              userId,
              routineId: routineId ?? null,
              startedAt: new Date(startedAt!).toISOString(),
              completedAt,
              sets,
            };

            try {
              await saveWorkout(workout);
              Toast.show({ type: 'success', text1: '¡Entrenamiento completado!' });
            } catch {
              await queueWorkout(workout);
              Toast.show({
                type: 'info',
                text1: 'Guardado sin conexión',
                text2: 'Se sincronizará cuando vuelva el internet',
              });
            }

            setSaving(false);
            finishWorkout();
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert('Cancelar entrenamiento', '¿Salís sin guardar?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: () => {
          finishWorkout();
          router.back();
        },
      },
    ]);
  };

  if (!isActive || !currentExercise) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
            No hay entrenamiento activo
          </Text>
          <Button label="Volver" onPress={() => router.back()} style={{ marginTop: 16 }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="close" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          {startedAt && <SessionTimer startedAt={startedAt} />}
          {completedSetsCount > 0 && (
            <Text style={[typography.labelSm, { color: colors.primaryContainer }]}>
              {completedSetsCount} {completedSetsCount === 1 ? 'serie' : 'series'} registradas
            </Text>
          )}
        </View>
        <Button label="Finalizar" onPress={handleFinish} variant="secondary" size="sm" loading={saving} />
      </View>

      {/* Exercise navigation dots */}
      <View style={styles.exerciseNav}>
        {exercises.map((ex, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.navDot, i === currentExerciseIndex && styles.navDotActive]}
            onPress={() => setCurrentExercise(i)}
          />
        ))}
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={16}
      >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Current exercise info */}
        <View style={styles.exerciseHeader}>
          <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, letterSpacing: 2 }]}>
            EJERCICIO {currentExerciseIndex + 1} DE {exercises.length}
          </Text>
          <Text style={[typography.headlineSm, { color: colors.onSurface }]}>
            {currentExercise.routine_exercise.exercises?.name ?? 'Ejercicio'}
          </Text>
          <Text style={[typography.bodyMd, { color: colors.secondary }]}>
            {currentExercise.routine_exercise.target_sets} series ×{' '}
            {currentExercise.routine_exercise.target_reps} reps
          </Text>
          {currentExercise.routine_exercise.exercises?.gif_url ? (
            <ExerciseVideo uri={currentExercise.routine_exercise.exercises.gif_url} />
          ) : currentExercise.routine_exercise.exercises?.image_url ? (
            <Image
              source={{ uri: currentExercise.routine_exercise.exercises.image_url }}
              style={styles.exerciseGif}
              resizeMode="contain"
            />
          ) : null}
        </View>

        {/* Rest timer */}
        {showRestTimer && (
          <RestTimer
            seconds={restSeconds}
            onFinish={() => setShowRestTimer(false)}
            onSkip={() => setShowRestTimer(false)}
          />
        )}

        {/* Sets */}
        <View style={styles.setsContainer}>
          <View style={styles.setsHeader}>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, flex: 0.1 }]}>#</Text>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, flex: 1, textAlign: 'center' }]}>KG</Text>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, flex: 1, textAlign: 'center' }]}>REPS</Text>
            <View style={{ width: 36 }} />
          </View>

          {currentExercise.sets.map((set, i) => (
            <SetRow
              key={i}
              set={set}
              index={i}
              onWeightChange={(v) => updateSet(currentExerciseIndex, i, { weight_kg: v })}
              onRepsChange={(v) => updateSet(currentExerciseIndex, i, { reps: v })}
              onComplete={() => handleCompleteSet(i)}
            />
          ))}

          <TouchableOpacity
            style={styles.addSetButton}
            onPress={() => addSet(currentExerciseIndex)}
          >
            <Ionicons name="add" size={18} color={colors.secondary} />
            <Text style={[typography.labelLg, { color: colors.secondary }]}>Agregar serie</Text>
          </TouchableOpacity>
        </View>

        {/* Previous / Next exercise buttons */}
        <View style={styles.exerciseButtons}>
          {currentExerciseIndex > 0 && (
            <Button
              label="← Anterior"
              variant="ghost"
              onPress={() => setCurrentExercise(currentExerciseIndex - 1)}
              style={{ flex: 1 }}
            />
          )}
          {currentExerciseIndex < exercises.length - 1 && (
            <Button
              label="Siguiente →"
              variant="secondary"
              onPress={() => setCurrentExercise(currentExerciseIndex + 1)}
              style={{ flex: 1 }}
            />
          )}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 24,
  },
  exerciseNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingBottom: 8,
  },
  navDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.outlineVariant,
  },
  navDotActive: {
    width: 20,
    backgroundColor: colors.primaryContainer,
  },
  content: { padding: 24, gap: 24 },
  exerciseHeader: { gap: 8 },
  exerciseGif: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: colors.surfaceVariant,
    marginTop: 4,
  },
  setsContainer: { gap: 8 },
  setsHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4, marginBottom: 4 },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderStyle: 'dashed',
    marginTop: 4,
  },
  exerciseButtons: { flexDirection: 'row', gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
