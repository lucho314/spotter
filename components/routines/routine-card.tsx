import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Routine, RoutineDay } from '@/types';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

const WEEK_ORDER: Record<string, number> = {
  Lunes: 1, Martes: 2, Miércoles: 3, Jueves: 4, Viernes: 5, Sábado: 6, Domingo: 7,
};

const DAY_ABBR: Record<string, string> = {
  Lunes: 'Lun', Martes: 'Mar', Miércoles: 'Mié', Jueves: 'Jue',
  Viernes: 'Vie', Sábado: 'Sáb', Domingo: 'Dom',
};

interface RoutineCardProps {
  routine: Routine;
  exerciseCount?: number;
  onPress: () => void;
  onLongPress?: () => void;
}

export function RoutineCard({ routine, exerciseCount = 0, onPress, onLongPress }: RoutineCardProps) {
  const days = ((routine.routine_days ?? []) as RoutineDay[]).sort(
    (a, b) => (WEEK_ORDER[a.name] ?? 99) - (WEEK_ORDER[b.name] ?? 99)
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
    >
      <View style={styles.top}>
        <Text style={[typography.titleLg, { color: colors.onSurface, flex: 1 }]} numberOfLines={1}>
          {routine.name}
        </Text>
        <Ionicons name="chevron-forward" size={20} color={colors.onSurfaceVariant} />
      </View>
      {routine.description ? (
        <Text style={[typography.bodyMd, styles.desc]} numberOfLines={2}>
          {routine.description}
        </Text>
      ) : null}
      <View style={styles.meta}>
        <View style={styles.chip}>
          <Ionicons name="barbell-outline" size={14} color={colors.secondary} />
          <Text style={[typography.labelMd, { color: colors.secondary }]}>
            {exerciseCount} ejercicios
          </Text>
        </View>
        {days.length > 0 ? (
          <View style={styles.daysRow}>
            {days.map((d) => (
              <View key={d.id} style={styles.dayChip}>
                <Text style={[typography.labelSm, { color: colors.primary }]}>
                  {DAY_ABBR[d.name] ?? d.name}
                </Text>
              </View>
            ))}
          </View>
        ) : routine.days_per_week ? (
          <View style={styles.chip}>
            <Ionicons name="calendar-outline" size={14} color={colors.onSurfaceVariant} />
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
              {routine.days_per_week}x / semana
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 24,
    padding: 20,
    gap: 10,
  },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  desc: { color: colors.onSurfaceVariant },
  meta: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', alignItems: 'center' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  daysRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  dayChip: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
