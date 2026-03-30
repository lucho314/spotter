import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/constants/colors';

const spotterLogo = require('../../assets/images/icono.png');

interface StorySet {
  set_number: number;
  weight_kg: number;
  reps: number;
}

interface StoryExercise {
  name: string;
  sets: StorySet[];
}

interface WorkoutStoryCardProps {
  routineName: string;
  date: string;
  duration: string;
  totalVolume: number;
  exercises: StoryExercise[];
}

// 9:16 aspect ratio card — designed to be captured with react-native-view-shot
// Width: 390, Height: 693 (390 * 16/9 ≈ 693)
export const STORY_WIDTH = 390;
export const STORY_HEIGHT = 693;

export function WorkoutStoryCard({
  routineName,
  date,
  duration,
  totalVolume,
  exercises,
}: WorkoutStoryCardProps) {
  // Show max 4 exercises to keep card compact
  const visibleExercises = exercises.slice(0, 4);
  const hiddenCount = exercises.length - visibleExercises.length;

  return (
    <View style={styles.card}>
      {/* Background accent */}
      <View style={styles.accentBar} />

      {/* Header: brand */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Image source={spotterLogo} style={styles.brandLogo} resizeMode="contain" />
          <Text style={styles.brandName}>SPOTTER</Text>
        </View>
        <Text style={styles.dateText}>{date}</Text>
      </View>

      {/* Hero: routine name + stats */}
      <View style={styles.hero}>
        <Text style={styles.routineName} numberOfLines={2}>
          {routineName}
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, styles.cyan]}>{duration}</Text>
            <Text style={styles.statLabel}>DURACIÓN</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={[styles.statValue, styles.lime]}>
              {Math.round(totalVolume).toLocaleString('es-AR')}
            </Text>
            <Text style={styles.statLabel}>KG TOTAL</Text>
          </View>
        </View>
      </View>

      {/* Exercises list */}
      <View style={styles.exercisesList}>
        {visibleExercises.map((ex, i) => {
          const topSet = [...ex.sets].sort((a, b) => b.weight_kg - a.weight_kg)[0];
          const summary = topSet
            ? `${ex.sets.length} × ${topSet.reps} — ${topSet.weight_kg} kg`
            : `${ex.sets.length} series`;

          return (
            <View key={i} style={styles.exerciseRow}>
              <View style={styles.exerciseIndex}>
                <Text style={styles.exerciseIndexText}>{i + 1}</Text>
              </View>
              <Text style={styles.exerciseName} numberOfLines={1}>
                {ex.name}
              </Text>
              <Text style={styles.exerciseSummary}>{summary}</Text>
            </View>
          );
        })}
        {hiddenCount > 0 && (
          <Text style={styles.moreText}>+{hiddenCount} ejercicio{hiddenCount > 1 ? 's' : ''} más</Text>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerText}>Entrenado con SPOTTER</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: STORY_WIDTH,
    height: STORY_HEIGHT,
    backgroundColor: '#0e0e0e',
    overflow: 'hidden',
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 28,
    justifyContent: 'space-between',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.primaryContainer,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandLogo: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primaryContainer,
    letterSpacing: 2,
  },
  dateText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textTransform: 'capitalize',
  },

  // Hero
  hero: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  routineName: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.onSurface,
    letterSpacing: -1,
    lineHeight: 34,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  stat: {
    gap: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 30,
  },
  cyan: { color: colors.secondary },
  lime: { color: colors.primaryContainer },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: colors.onSurfaceVariant,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#2c2c2c',
  },

  // Exercises
  exercisesList: {
    gap: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  exerciseIndex: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#2c2c2c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseIndexText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
  },
  exerciseName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
  },
  exerciseSummary: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  moreText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingTop: 4,
  },

  // Footer
  footer: {
    gap: 10,
    alignItems: 'center',
  },
  footerLine: {
    width: 48,
    height: 2,
    backgroundColor: colors.primaryContainer,
    borderRadius: 1,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.outlineVariant,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
