import React from 'react';
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
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { useLastSetsForExercise } from '@/hooks/queries/use-workouts';
import { useAuth } from '@/lib/auth';

interface LastSessionModalProps {
  visible: boolean;
  onClose: () => void;
  exerciseId: number | null;
  exerciseName: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function LastSessionModal({ visible, onClose, exerciseId, exerciseName }: LastSessionModalProps) {
  const { user } = useAuth();
  const { data, isLoading } = useLastSetsForExercise(user?.id ?? null, exerciseId);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>Último entrenamiento</Text>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: 2 }]} numberOfLines={1}>
              {exerciseName}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator color={colors.primaryContainer} style={{ marginVertical: 32 }} />
        ) : !data ? (
          <View style={styles.empty}>
            <Ionicons name="barbell-outline" size={40} color={colors.outlineVariant} />
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 12 }]}>
              Sin registros previos para este ejercicio
            </Text>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, marginBottom: 12, letterSpacing: 1 }]}>
              {formatDate(data.session_date).toUpperCase()}
            </Text>

            <View style={styles.header}>
              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, width: 32 }]}>#</Text>
              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, flex: 1, textAlign: 'center' }]}>KG</Text>
              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, flex: 1, textAlign: 'center' }]}>REPS</Text>
            </View>

            {data.sets.map((s) => (
              <View key={s.set_number} style={styles.row}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, width: 32 }]}>
                  {s.set_number}
                </Text>
                <Text style={[typography.titleMd, { color: colors.primaryContainer, flex: 1, textAlign: 'center' }]}>
                  {s.weight_kg}
                </Text>
                <Text style={[typography.titleMd, { color: colors.onSurface, flex: 1, textAlign: 'center' }]}>
                  {s.reps}
                </Text>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Volumen total</Text>
              <Text style={[typography.labelMd, { color: colors.secondary }]}>
                {data.sets.reduce((acc, s) => acc + s.weight_kg * s.reps, 0).toLocaleString()} kg
              </Text>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    marginBottom: 20,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  content: {
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '30',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '15',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant + '30',
  },
});
