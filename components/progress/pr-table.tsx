import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PersonalRecord } from '@/types';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';

interface PRTableProps {
  records: PersonalRecord[];
}

export function PRTable({ records }: PRTableProps) {
  if (!records.length) {
    return (
      <View style={styles.empty}>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
          Registrá entrenamientos para ver tus PRs
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {records.map((pr) => (
        <View key={pr.id} style={styles.row}>
          <View style={styles.left}>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>
              {(pr as any).exercises?.name ?? 'Ejercicio'}
            </Text>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
              {pr.best_weight_kg} kg × {pr.best_reps_at_weight} reps
            </Text>
          </View>
          <View style={styles.right}>
            <Ionicons name="trophy-outline" size={14} color={colors.primaryContainer} />
            <Text style={[typography.headlineSm, { color: colors.primaryContainer }]}>
              {pr.estimated_1rm.toFixed(1)}
            </Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>1RM</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHighest,
    borderRadius: 16,
    padding: 14,
  },
  left: { flex: 1, gap: 2 },
  right: { alignItems: 'flex-end', gap: 2 },
  empty: { padding: 24, alignItems: 'center' },
});
