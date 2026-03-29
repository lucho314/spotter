import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { PRTable } from '@/components/progress/pr-table';
import { ExerciseProgressChart } from '@/components/progress/exercise-progress-chart';
import { usePersonalRecords, useExerciseProgress } from '@/hooks/queries/use-progress';
import { PersonalRecord } from '@/types';

export default function ProgressScreen() {
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const { data: prs, isLoading: prsLoading, refetch: refetchPRs } = usePersonalRecords();
  const { data: exerciseProgress, refetch: refetchProgress } = useExerciseProgress(selectedExerciseId!);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchPRs(), refetchProgress?.()]);
    setRefreshing(false);
  };

  const selectedPR = prs?.find((pr) => pr.exercise_id === selectedExerciseId);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primaryContainer} />}
      >
        <Text style={[typography.headlineMd, { color: colors.onSurface }]}>Progreso</Text>

        {/* PR Table */}
        <View style={styles.section}>
          <Text style={[typography.titleMd, { color: colors.onSurface }]}>Records Personales</Text>
          {prsLoading ? (
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Cargando...</Text>
          ) : (
            <PRTable records={prs ?? []} />
          )}
        </View>

        {/* Exercise chart selector */}
        {(prs?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>Evolución por Ejercicio</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorScroll}>
              <View style={styles.selectorRow}>
                {prs!.map((pr: PersonalRecord) => (
                  <TouchableOpacity
                    key={pr.exercise_id}
                    style={[
                      styles.exerciseChip,
                      selectedExerciseId === pr.exercise_id && styles.exerciseChipActive,
                    ]}
                    onPress={() =>
                      setSelectedExerciseId(
                        selectedExerciseId === pr.exercise_id ? null : pr.exercise_id
                      )
                    }
                  >
                    <Text
                      style={[
                        typography.labelMd,
                        {
                          color:
                            selectedExerciseId === pr.exercise_id
                              ? colors.onPrimary
                              : colors.onSurfaceVariant,
                        },
                      ]}
                      numberOfLines={1}
                    >
                      {(pr as any).exercises?.name ?? 'Ejercicio'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {selectedExerciseId && (
              <View style={styles.chartSection}>
                {selectedPR && (
                  <View style={styles.prBadge}>
                    <Text style={[typography.labelSm, { color: colors.primaryContainer }]}>
                      PR: {selectedPR.best_weight_kg} kg × {selectedPR.best_reps_at_weight} reps
                    </Text>
                    <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
                      · 1RM est. {selectedPR.estimated_1rm.toFixed(1)} kg
                    </Text>
                  </View>
                )}
                <ExerciseProgressChart data={exerciseProgress ?? []} />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, gap: 24, paddingBottom: 32 },
  section: { gap: 12 },
  selectorScroll: { marginHorizontal: -24, paddingLeft: 24 },
  selectorRow: { flexDirection: 'row', gap: 8, paddingRight: 24 },
  exerciseChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceHighest,
    maxWidth: 160,
  },
  exerciseChipActive: { backgroundColor: colors.primaryContainer },
  chartSection: { gap: 10 },
  prBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
});
