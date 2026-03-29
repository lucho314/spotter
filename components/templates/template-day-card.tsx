import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { TemplateDay } from '@/types';

interface TemplateDayCardProps {
  day: TemplateDay;
  onExercisePress?: (exerciseId: number) => void;
}

export function TemplateDayCard({ day, onExercisePress }: TemplateDayCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded((v) => !v)}
        activeOpacity={0.7}
      >
        <View style={styles.dayBadge}>
          <Text style={[typography.labelSm, { color: colors.onPrimary }]}>{day.day_number}</Text>
        </View>
        <Text style={[typography.titleMd, { color: colors.onSurface, flex: 1 }]}>
          {day.name_es}
        </Text>
        <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginRight: 8 }]}>
          {day.template_day_exercises?.length ?? 0} ejercicios
        </Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.onSurfaceVariant}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.exercises}>
          {(day.template_day_exercises ?? []).map((tde) => (
            <TouchableOpacity
              key={tde.id}
              style={styles.exerciseRow}
              onPress={() => onExercisePress?.(tde.exercise_id)}
              activeOpacity={tde.exercises ? 0.7 : 1}
            >
              <View style={styles.exerciseInfo}>
                <Text style={[typography.bodyMd, { color: colors.onSurface }]} numberOfLines={1}>
                  {tde.exercises?.name ?? `Ejercicio ${tde.exercise_id}`}
                </Text>
                {tde.exercises?.muscle_groups && (
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
                    {tde.exercises.muscle_groups.name}
                  </Text>
                )}
              </View>
              <Text style={[typography.labelSm, { color: colors.primaryContainer }]}>
                {tde.target_sets}×{tde.target_reps} · {tde.rest_seconds}s
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 10,
  },
  dayBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exercises: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceHighest,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceHighest,
    gap: 8,
  },
  exerciseInfo: {
    flex: 1,
    gap: 2,
  },
});
