import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

const DAYS = [2, 3, 4, 5, 6];

interface DaysSelectorProps {
  selected: number | undefined;
  onSelect: (days: number | undefined) => void;
}

export function DaysSelector({ selected, onSelect }: DaysSelectorProps) {
  return (
    <View style={styles.row}>
      <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>Días/semana:</Text>
      <View style={styles.buttons}>
        {DAYS.map((d) => {
          const isSelected = selected === d;
          return (
            <TouchableOpacity
              key={d}
              style={[styles.circle, isSelected && styles.circleSelected]}
              onPress={() => onSelect(isSelected ? undefined : d)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  typography.titleSm,
                  { color: isSelected ? colors.onPrimary : colors.onSurfaceVariant },
                ]}
              >
                {d}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSelected: {
    backgroundColor: colors.primaryContainer,
  },
});
