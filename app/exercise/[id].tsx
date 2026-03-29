import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { ExerciseGif } from '@/components/exercises/exercise-gif';
import { useExercise } from '@/hooks/queries/use-exercises';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const exerciseId = id ? parseInt(id, 10) : null;
  const { data: exercise, isLoading } = useExercise(exerciseId);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator color={colors.primaryContainer} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (!exercise) return null;

  const DIFFICULTY_MAP: Record<string, string> = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  };

  const CATEGORY_MAP: Record<string, string> = {
    compound: 'Compuesto',
    isolation: 'Aislamiento',
    cardio: 'Cardio',
    stretch: 'Estiramiento',
    plyometric: 'Pliométrico',
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={22} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ExerciseGif gifUrl={exercise.gif_url} size={280} />

        <Text style={[typography.headlineMd, { color: colors.onSurface }]}>{exercise.name}</Text>

        <View style={styles.badgeRow}>
          {exercise.muscle_groups && (
            <View style={[styles.badge, styles.badgePrimary]}>
              <Text style={[typography.labelMd, { color: colors.onPrimary }]}>
                {exercise.muscle_groups.name.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.badge}>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
              {exercise.equipment.toUpperCase()}
            </Text>
          </View>
          {exercise.difficulty && (
            <View style={styles.badge}>
              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
                {DIFFICULTY_MAP[exercise.difficulty]?.toUpperCase()}
              </Text>
            </View>
          )}
          {exercise.category && (
            <View style={styles.badge}>
              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
                {CATEGORY_MAP[exercise.category]?.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {exercise.secondary_muscles?.length > 0 && (
          <View style={styles.section}>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>
              Músculos secundarios
            </Text>
            <View style={styles.chipRow}>
              {exercise.secondary_muscles.map((m, i) => (
                <View key={i} style={styles.chip}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>{m}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {exercise.instructions?.length > 0 && (
          <View style={styles.section}>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>Instrucciones</Text>
            <View style={styles.instructions}>
              {exercise.instructions.map((step, i) => (
                <View key={i} style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={[typography.labelSm, { color: colors.onPrimary }]}>{i + 1}</Text>
                  </View>
                  <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, flex: 1, lineHeight: 22 }]}>
                    {step}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    paddingTop: 0,
    gap: 16,
    paddingBottom: 48,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgePrimary: {
    backgroundColor: colors.primaryContainer,
  },
  section: {
    gap: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  instructions: {
    gap: 10,
  },
  step: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
});
