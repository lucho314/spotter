import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RoutineExercise } from '@/types';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface ExerciseListItemProps {
  item: RoutineExercise;
  onRemove?: () => void;
}

export function ExerciseListItem({ item, onRemove }: ExerciseListItemProps) {
  const exercise = item.exercises;
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={[typography.titleMd, { color: colors.onSurface }]}>
          {exercise?.name ?? 'Ejercicio'}
        </Text>
        <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
          {item.target_sets} series × {item.target_reps} reps · {item.rest_seconds}s descanso
        </Text>
      </View>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Ionicons name="trash-outline" size={18} color={colors.error} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  left: { flex: 1, gap: 2 },
});
