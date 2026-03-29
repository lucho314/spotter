import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { TemplateDayCard } from '@/components/templates/template-day-card';
import { useTemplate, useAdoptTemplate } from '@/hooks/queries/use-templates';
import { FitnessGoal, TemplateDifficulty } from '@/types';

const GOAL_LABELS: Record<FitnessGoal, string> = {
  strength: 'Fuerza',
  hypertrophy: 'Hipertrofia',
  fat_loss: 'Quema Grasa',
  general: 'General',
};

const GOAL_COLORS: Record<FitnessGoal, string> = {
  strength: '#ff7351',
  hypertrophy: colors.secondary,
  fat_loss: '#fcdc43',
  general: colors.primaryContainer,
};

const DIFFICULTY_LABELS: Record<TemplateDifficulty, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

export default function TemplateDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: template, isLoading } = useTemplate(id ?? null);
  const adoptMutation = useAdoptTemplate();

  const handleAdopt = () => {
    Alert.alert(
      'Usar esta rutina',
      `Se crearán ${template?.days_per_week} rutinas en tu lista (una por día). ¿Continuar?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear rutinas',
          onPress: async () => {
            try {
              await adoptMutation.mutateAsync(id!);
              Toast.show({ type: 'success', text1: '¡Rutinas creadas!', text2: 'Las encontrás en Mis Rutinas' });
              router.push('/(tabs)/routines');
            } catch {
              Toast.show({ type: 'error', text1: 'Error al crear rutinas' });
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator color={colors.primaryContainer} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  if (!template) return null;

  const goalColor = GOAL_COLORS[template.goal];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[typography.headlineSm, { color: colors.onSurface, flex: 1 }]} numberOfLines={1}>
          {template.name_es}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: goalColor + '22' }]}>
            <Text style={[typography.labelMd, { color: goalColor }]}>
              {GOAL_LABELS[template.goal].toUpperCase()}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
              {DIFFICULTY_LABELS[template.difficulty].toUpperCase()}
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
              {template.days_per_week} DÍAS/SEM
            </Text>
          </View>
        </View>

        {template.description_es && (
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, lineHeight: 22 }]}>
            {template.description_es}
          </Text>
        )}

        <Text style={[typography.titleLg, { color: colors.onSurface, marginTop: 8 }]}>
          Estructura del programa
        </Text>

        <View style={styles.days}>
          {(template.template_days ?? []).map((day) => (
            <TemplateDayCard
              key={day.id}
              day={day}
              onExercisePress={(exerciseId) =>
                router.push(`/exercise/${exerciseId}`)
              }
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={adoptMutation.isPending ? 'Creando rutinas...' : 'Usar esta rutina'}
          onPress={handleAdopt}
          disabled={adoptMutation.isPending}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    paddingTop: 8,
    gap: 16,
    paddingBottom: 100,
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
  days: {
    gap: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: colors.background,
    borderTopColor: colors.surfaceContainer,
    borderTopWidth: 1,
  },
});
