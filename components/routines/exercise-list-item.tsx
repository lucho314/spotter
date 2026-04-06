import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RoutineDay, RoutineExercise } from '@/types';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface ExerciseListItemProps {
  item: RoutineExercise;
  days: RoutineDay[];
  onRemove?: () => void;
  onEdit?: (payload: { day_number?: number; target_sets?: number; target_reps?: number; rest_seconds?: number }) => void;
}

export function ExerciseListItem({ item, days, onRemove, onEdit }: ExerciseListItemProps) {
  const exercise = item.exercises;
  const [editing, setEditing] = useState(false);
  const [sets, setSets] = useState(String(item.target_sets));
  const [reps, setReps] = useState(String(item.target_reps));
  const [rest, setRest] = useState(String(item.rest_seconds));
  const [day, setDay] = useState(item.day_number);

  const handleSave = () => {
    onEdit?.({
      day_number: day,
      target_sets: parseInt(sets) || item.target_sets,
      target_reps: parseInt(reps) || item.target_reps,
      rest_seconds: parseInt(rest) || item.rest_seconds,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setSets(String(item.target_sets));
    setReps(String(item.target_reps));
    setRest(String(item.rest_seconds));
    setDay(item.day_number);
    setEditing(false);
  };

  const currentDayName = days.find((d) => d.day_number === day)?.name;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={[typography.titleMd, { color: colors.onSurface }]}>
            {exercise?.name ?? 'Ejercicio'}
          </Text>
          <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
            {item.target_sets} series × {item.target_reps} reps · {item.rest_seconds}s descanso
          </Text>
        </View>
        <View style={styles.actions}>
          {onEdit && (
            <TouchableOpacity onPress={() => setEditing(true)} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <Ionicons name="pencil-outline" size={18} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          )}
          {onRemove && (
            <TouchableOpacity onPress={onRemove} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <Ionicons name="trash-outline" size={18} color={colors.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal visible={editing} transparent animationType="fade" onRequestClose={handleCancel}>
        <KeyboardAvoidingView
          style={styles.overlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.sheet}>
            <Text style={[typography.titleMd, { color: colors.onSurface, marginBottom: 16 }]}>
              {exercise?.name ?? 'Ejercicio'}
            </Text>

            <View style={styles.row}>
              <View style={styles.field}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>Series</Text>
                <TextInput
                  style={styles.input}
                  value={sets}
                  onChangeText={setSets}
                  keyboardType="number-pad"
                  selectTextOnFocus
                />
              </View>
              <View style={styles.field}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>Reps</Text>
                <TextInput
                  style={styles.input}
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="number-pad"
                  selectTextOnFocus
                />
              </View>
              <View style={styles.field}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 4 }]}>Descanso (s)</Text>
                <TextInput
                  style={styles.input}
                  value={rest}
                  onChangeText={setRest}
                  keyboardType="number-pad"
                  selectTextOnFocus
                />
              </View>
            </View>

            {days.length > 0 && (
              <>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginBottom: 8 }]}>
                  Mover a día
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                  <View style={styles.dayRow}>
                    {days.map((d) => (
                      <TouchableOpacity
                        key={d.id}
                        style={[styles.dayChip, day === d.day_number && styles.dayChipActive]}
                        onPress={() => setDay(d.day_number)}
                      >
                        <Text
                          style={[
                            typography.labelMd,
                            { color: day === d.day_number ? colors.onPrimary : colors.onSurface },
                          ]}
                          numberOfLines={1}
                        >
                          {d.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </>
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.btnCancel} onPress={handleCancel}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSave} onPress={handleSave}>
                <Text style={[typography.labelMd, { color: colors.onPrimary }]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  left: { flex: 1, gap: 2 },
  actions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  row: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  field: { flex: 1 },
  input: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 10,
    padding: 10,
    color: colors.onSurface,
    textAlign: 'center',
    fontSize: 16,
  },
  dayRow: { flexDirection: 'row', gap: 8 },
  dayChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    maxWidth: 160,
  },
  dayChipActive: {
    backgroundColor: colors.primary,
  },
  modalActions: { flexDirection: 'row', gap: 12 },
  btnCancel: {
    flex: 1, padding: 14, borderRadius: 12,
    backgroundColor: colors.surfaceContainer, alignItems: 'center',
  },
  btnSave: {
    flex: 1, padding: 14, borderRadius: 12,
    backgroundColor: colors.primary, alignItems: 'center',
  },
});
