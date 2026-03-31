import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { useSession, useUpdateWorkoutSet } from '@/hooks/queries/use-workouts';
import { WorkoutSet } from '@/types';
import { WorkoutShareModal } from '@/components/workout/workout-share-modal';

function groupSetsByExercise(sets: WorkoutSet[]) {
  const map = new Map<number, WorkoutSet[]>();
  sets.forEach((s) => {
    if (!map.has(s.exercise_id)) map.set(s.exercise_id, []);
    map.get(s.exercise_id)!.push(s);
  });
  return map;
}

function formatDuration(start: string, end: string | null) {
  if (!end) return '-';
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 60) return `${min} min`;
  return `${Math.floor(min / 60)}h ${min % 60}min`;
}

interface EditableSetRowProps {
  set: WorkoutSet;
  onSave: (id: string, weight_kg: number, reps: number) => Promise<void>;
  isSaving: boolean;
}

function EditableSetRow({ set, onSave, isSaving }: EditableSetRowProps) {
  const [editing, setEditing] = useState(false);
  const [weight, setWeight] = useState(String(set.weight_kg));
  const [reps, setReps] = useState(String(set.reps));

  const handleSave = async () => {
    const w = parseFloat(weight);
    const r = parseInt(reps, 10);
    if (isNaN(w) || isNaN(r) || r <= 0 || w < 0) {
      Toast.show({ type: 'error', text1: 'Valores inválidos' });
      return;
    }
    await onSave(set.id, w, r);
    setEditing(false);
  };

  const handleCancel = () => {
    setWeight(String(set.weight_kg));
    setReps(String(set.reps));
    setEditing(false);
  };

  if (editing) {
    return (
      <View style={[styles.setRow, styles.setRowEditing]}>
        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, width: 24 }]}>
          {set.set_number}
        </Text>
        <TextInput
          style={styles.editInput}
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
          selectTextOnFocus
        />
        <Text style={{ color: colors.onSurfaceVariant, paddingHorizontal: 4 }}>kg ×</Text>
        <TextInput
          style={styles.editInput}
          value={reps}
          onChangeText={setReps}
          keyboardType="number-pad"
          selectTextOnFocus
        />
        <Text style={{ color: colors.onSurfaceVariant, paddingRight: 8 }}>reps</Text>
        {isSaving ? (
          <ActivityIndicator size="small" color={colors.primaryContainer} />
        ) : (
          <View style={styles.editActions}>
            <TouchableOpacity onPress={handleSave} style={styles.actionBtn}>
              <Ionicons name="checkmark" size={18} color={colors.primaryContainer} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.actionBtn}>
              <Ionicons name="close" size={18} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.setRow}>
      <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, width: 24 }]}>
        {set.set_number}
      </Text>
      <Text style={[typography.titleMd, { color: colors.onSurface, flex: 1 }]}>
        {set.weight_kg} kg × {set.reps} reps
      </Text>
      {set.rpe && (
        <Text style={[typography.labelMd, { color: colors.secondary, marginRight: 8 }]}>
          RPE {set.rpe}
        </Text>
      )}
      <TouchableOpacity onPress={() => setEditing(true)} style={styles.editBtn}>
        <Ionicons name="pencil-outline" size={16} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
    </View>
  );
}

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isLoading } = useSession(id);
  const { mutateAsync: updateSet, isPending } = useUpdateWorkoutSet(id);
  const [shareVisible, setShareVisible] = useState(false);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const sets = ((session as any)?.workout_sets ?? []) as WorkoutSet[];
  const grouped = groupSetsByExercise(sets);
  const totalVolume = sets.reduce((acc, s) => acc + s.weight_kg * s.reps, 0);

  const handleSaveSet = async (setId: string, weight_kg: number, reps: number) => {
    try {
      await updateSet({ id: setId, weight_kg, reps });
      Toast.show({ type: 'success', text1: 'Serie actualizada' });
    } catch {
      Toast.show({ type: 'error', text1: 'Error al guardar' });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[typography.titleMd, { color: colors.onSurface }]}>Detalle</Text>
        <TouchableOpacity
          onPress={() => setShareVisible(true)}
          style={styles.shareBtn}
          disabled={!session || sets.length === 0}
        >
          <Ionicons
            name="share-outline"
            size={22}
            color={sets.length > 0 ? colors.primaryContainer : colors.outlineVariant}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={[typography.headlineSm, { color: colors.onSurface }]}>
            {(session as any)?.routines?.name ?? 'Entrenamiento libre'}
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={[typography.headlineLg, { color: colors.secondary }]}>
                {formatDuration(session?.started_at ?? '', session?.completed_at ?? null)}
              </Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>DURACIÓN</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={[typography.headlineLg, { color: colors.primaryContainer }]}>
                {Math.round(totalVolume).toLocaleString()}
              </Text>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>KG TOTAL</Text>
            </View>
          </View>
        </View>

        {Array.from(grouped.entries()).map(([exerciseId, exSets]) => {
          const exercise = (exSets[0] as any)?.exercises;
          return (
            <View key={exerciseId} style={styles.exerciseBlock}>
              <Text style={[typography.titleMd, { color: colors.onSurface, marginBottom: 8 }]}>
                {exercise?.name ?? 'Ejercicio'}
              </Text>
              {exSets
                .sort((a, b) => a.set_number - b.set_number)
                .map((s) => (
                  <EditableSetRow
                    key={s.id}
                    set={s}
                    onSave={handleSaveSet}
                    isSaving={isPending}
                  />
                ))}
            </View>
          );
        })}

        {sets.length === 0 && (
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center' }]}>
            No hay series registradas
          </Text>
        )}
      </ScrollView>

      {session && (
        <WorkoutShareModal
          visible={shareVisible}
          onClose={() => setShareVisible(false)}
          session={session as any}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 24,
  },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 24, paddingTop: 0, gap: 24 },
  hero: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 24,
    padding: 20,
    gap: 16,
  },
  heroStats: { flexDirection: 'row', gap: 32 },
  heroStat: { gap: 4 },
  exerciseBlock: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    padding: 16,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '20',
  },
  setRowEditing: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 10,
    borderBottomWidth: 0,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  editInput: {
    backgroundColor: colors.surfaceLow,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: colors.onSurface,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    textAlign: 'center',
    minWidth: 56,
  },
  editActions: { flexDirection: 'row', gap: 4 },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    padding: 6,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
