import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { FitnessGoal } from '@/types';

const GOALS: { key: FitnessGoal; label: string; icon: string }[] = [
  { key: 'strength', label: 'Fuerza', icon: 'barbell-outline' },
  { key: 'hypertrophy', label: 'Hipertrofia', icon: 'body-outline' },
  { key: 'fat_loss', label: 'Quema Grasa', icon: 'flame-outline' },
  { key: 'general', label: 'General', icon: 'star-outline' },
];

interface GoalSelectorProps {
  selected: FitnessGoal | undefined;
  onSelect: (goal: FitnessGoal | undefined) => void;
}

export function GoalSelector({ selected, onSelect }: GoalSelectorProps) {
  return (
    <View style={styles.row}>
      {GOALS.map((g) => {
        const isSelected = selected === g.key;
        return (
          <TouchableOpacity
            key={g.key}
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => onSelect(isSelected ? undefined : g.key)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={g.icon as any}
              size={20}
              color={isSelected ? colors.onPrimary : colors.onSurfaceVariant}
            />
            <Text
              style={[
                typography.labelSm,
                { color: isSelected ? colors.onPrimary : colors.onSurfaceVariant, marginTop: 4 },
              ]}
              numberOfLines={1}
            >
              {g.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSelected: {
    backgroundColor: colors.primaryContainer,
  },
});
