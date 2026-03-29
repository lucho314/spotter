import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { FitnessGoal, RoutineTemplate, TemplateDifficulty } from '@/types';

const GOAL_LABELS: Record<FitnessGoal, string> = {
  strength: 'FUERZA',
  hypertrophy: 'HIPERTROFIA',
  fat_loss: 'QUEMA GRASA',
  general: 'GENERAL',
};

const GOAL_COLORS: Record<FitnessGoal, string> = {
  strength: '#ff7351',
  hypertrophy: colors.secondary,
  fat_loss: '#fcdc43',
  general: colors.primaryContainer,
};

const DIFFICULTY_LABELS: Record<TemplateDifficulty, string> = {
  beginner: 'PRINCIPIANTE',
  intermediate: 'INTERMEDIO',
  advanced: 'AVANZADO',
};

interface TemplateCardProps {
  template: RoutineTemplate;
  onPress: () => void;
}

export function TemplateCard({ template, onPress }: TemplateCardProps) {
  const goalColor = GOAL_COLORS[template.goal];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={[typography.titleMd, { color: colors.onSurface }]} numberOfLines={2}>
          {template.name_es}
        </Text>
        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: goalColor + '22' }]}>
            <Text style={[typography.labelSm, { color: goalColor }]}>
              {GOAL_LABELS[template.goal]}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
              {DIFFICULTY_LABELS[template.difficulty]}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>
              {template.days_per_week} días/sem
            </Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.outlineVariant} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});
