import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { useSession } from '@/hooks/queries/use-workouts';
import { WorkoutSet } from '@/types';

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

export default function SessionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isLoading } = useSession(id);

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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[typography.titleMd, { color: colors.onSurface }]}>Detalle</Text>
        <View style={{ width: 24 }} />
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
                  <View key={s.id} style={styles.setRow}>
                    <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, width: 24 }]}>
                      {s.set_number}
                    </Text>
                    <Text style={[typography.titleMd, { color: colors.onSurface, flex: 1 }]}>
                      {s.weight_kg} kg × {s.reps} reps
                    </Text>
                    {s.rpe && (
                      <Text style={[typography.labelMd, { color: colors.secondary }]}>
                        RPE {s.rpe}
                      </Text>
                    )}
                  </View>
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
