import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  accent?: 'lime' | 'cyan';
}

export function StatsCard({ label, value, unit, accent = 'lime' }: StatsCardProps) {
  const valueColor = accent === 'lime' ? colors.primaryContainer : colors.secondary;
  return (
    <View style={styles.card}>
      <Text style={[typography.labelSm, styles.label]}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={[typography.headlineLg, { color: valueColor }]}>{value}</Text>
        {unit && <Text style={[typography.labelMd, styles.unit]}>{unit}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surfaceHighest,
    borderRadius: 24,
    padding: 20,
    gap: 8,
  },
  label: { color: colors.onSurfaceVariant, letterSpacing: 1.5 },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  unit: { color: colors.onSurfaceVariant, paddingBottom: 4 },
});
