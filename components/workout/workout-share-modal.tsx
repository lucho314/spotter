import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { shareWorkoutAsPdf } from '@/services/workout-export';
import { WorkoutStoryCard, STORY_WIDTH, STORY_HEIGHT } from './workout-story-card';

interface ShareModalSession {
  started_at: string;
  completed_at?: string | null;
  routines?: { name: string } | null;
  workout_sets?: Array<{
    exercise_id: number;
    set_number: number;
    weight_kg: number;
    reps: number;
    rpe?: number | null;
    exercises?: { name: string } | null;
  }>;
}

interface WorkoutShareModalProps {
  visible: boolean;
  onClose: () => void;
  session: ShareModalSession;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
}

function formatDuration(start: string, end?: string | null) {
  if (!end) return '—';
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const min = Math.floor(ms / 60000);
  return min < 60 ? `${min} min` : `${Math.floor(min / 60)}h ${min % 60}min`;
}

function groupExercises(sets: ShareModalSession['workout_sets']) {
  if (!sets) return [];
  const map = new Map<number, { name: string; sets: Array<{ set_number: number; weight_kg: number; reps: number }> }>();
  for (const s of sets) {
    if (!map.has(s.exercise_id)) {
      map.set(s.exercise_id, { name: s.exercises?.name ?? 'Ejercicio', sets: [] });
    }
    map.get(s.exercise_id)!.sets.push({ set_number: s.set_number, weight_kg: s.weight_kg, reps: s.reps });
  }
  return Array.from(map.values());
}

export function WorkoutShareModal({ visible, onClose, session }: WorkoutShareModalProps) {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const sets = session.workout_sets ?? [];
  const totalVolume = sets.reduce((acc, s) => acc + s.weight_kg * s.reps, 0);
  const exercises = groupExercises(session.workout_sets);

  const storyProps = {
    routineName: session.routines?.name ?? 'Entrenamiento libre',
    date: formatDate(session.started_at),
    duration: formatDuration(session.started_at, session.completed_at),
    totalVolume,
    exercises,
  };

  const handleSharePdf = async () => {
    setLoadingPdf(true);
    try {
      await shareWorkoutAsPdf(session);
      onClose();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error al generar el PDF' });
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleShareImage = async () => {
    setLoadingImage(true);
    try {
      const uri = await viewShotRef.current!.capture!();
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: 'Compartir historia',
        UTI: 'public.png',
      });
      onClose();
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error al generar la imagen' });
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Dimmed overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Hidden ViewShot for image capture — rendered off-screen */}
      <View style={styles.offscreen} pointerEvents="none">
        <ViewShot
          ref={viewShotRef}
          options={{
            format: 'png',
            quality: 1,
            width: STORY_WIDTH,
            height: STORY_HEIGHT,
          }}
        >
          <WorkoutStoryCard {...storyProps} />
        </ViewShot>
      </View>

      {/* Bottom sheet */}
      <View style={styles.sheet}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Title */}
        <View style={styles.titleRow}>
          <View>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>
              Compartir entrenamiento
            </Text>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: 2 }]}>
              Elegí el formato
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Options */}
        <View style={styles.optionsRow}>
          {/* PDF */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleSharePdf}
            disabled={loadingPdf || loadingImage}
            activeOpacity={0.7}
          >
            {loadingPdf ? (
              <ActivityIndicator color={colors.primaryContainer} />
            ) : (
              <View style={[styles.optionIcon, { backgroundColor: 'rgba(209,252,0,0.1)' }]}>
                <Ionicons name="document-text-outline" size={28} color={colors.primaryContainer} />
              </View>
            )}
            <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 12 }]}>
              PDF Detallado
            </Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 }]}>
              Todos los sets,{'\n'}volumen y estadísticas
            </Text>
          </TouchableOpacity>

          {/* Image / Story */}
          <TouchableOpacity
            style={[styles.optionCard, { borderColor: 'rgba(0,227,253,0.15)' }]}
            onPress={handleShareImage}
            disabled={loadingPdf || loadingImage}
            activeOpacity={0.7}
          >
            {loadingImage ? (
              <ActivityIndicator color={colors.secondary} />
            ) : (
              <View style={[styles.optionIcon, { backgroundColor: 'rgba(0,227,253,0.1)' }]}>
                <Ionicons name="phone-portrait-outline" size={28} color={colors.secondary} />
              </View>
            )}
            <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 12 }]}>
              Historia
            </Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 }]}>
              Optimizado para{'\n'}compartir en redes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  offscreen: {
    position: 'absolute',
    top: -10000,
    left: 0,
  },
  sheet: {
    backgroundColor: colors.surfaceContainer,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    paddingTop: 12,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.outlineVariant,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: colors.surfaceHighest,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(209,252,0,0.12)',
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
