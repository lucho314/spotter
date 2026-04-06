import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { ExerciseListItem } from '@/components/routines/exercise-list-item';
import {
  useRoutine,
  useRemoveExercise,
  useUpdateRoutineExercise,
  useCreateRoutineDay,
  useUpdateRoutineDay,
  useDeleteRoutineDay,
} from '@/hooks/queries/use-routines';
import { useWorkoutStore } from '@/stores/workout-store';
import { useAuth } from '@/lib/auth';
import { shareRoutine } from '@/services/sharing';
import { RoutineDay, RoutineExercise } from '@/types';

export default function RoutineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { data: routine, isLoading } = useRoutine(id);
  const removeExerciseMutation = useRemoveExercise(id);
  const updateExerciseMutation = useUpdateRoutineExercise(id);
  const createDayMutation = useCreateRoutineDay(id);
  const updateDayMutation = useUpdateRoutineDay(id);
  const deleteDayMutation = useDeleteRoutineDay(id);
  const startWorkout = useWorkoutStore((s) => s.startWorkout);

  const WEEK_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const [sharing, setSharing] = useState(false);
  const [editingDay, setEditingDay] = useState<RoutineDay | null>(null);
  const [editingDaySelected, setEditingDaySelected] = useState('');
  const [addingDay, setAddingDay] = useState(false);
  const [newDaySelected, setNewDaySelected] = useState('');

  const handleStartWorkout = () => {
    if (!routine?.routine_exercises?.length) {
      Toast.show({ type: 'error', text1: 'Agregá ejercicios primero' });
      return;
    }
    startWorkout(id, routine.routine_exercises as RoutineExercise[], user!.id);
    router.push(`/workout/${id}`);
  };

  const handleRemoveExercise = (item: RoutineExercise) => {
    Alert.alert(
      'Eliminar ejercicio',
      `¿Eliminás "${item.exercises?.name}" de la rutina?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => removeExerciseMutation.mutate(item.id),
        },
      ]
    );
  };

  const handleEditExercise = (
    item: RoutineExercise,
    payload: { day_number?: number; target_sets?: number; target_reps?: number; rest_seconds?: number }
  ) => {
    updateExerciseMutation.mutate({ id: item.id, payload });
  };

  const handleSaveDayName = () => {
    if (!editingDay || !editingDaySelected) return;
    updateDayMutation.mutate({ id: editingDay.id, name: editingDaySelected });
    setEditingDay(null);
  };

  const handleDeleteDay = (day: RoutineDay) => {
    const exercisesInDay = exercises.filter((e) => e.day_number === day.day_number);
    Alert.alert(
      'Eliminar día',
      exercisesInDay.length > 0
        ? `"${day.name}" tiene ${exercisesInDay.length} ejercicio(s). Si eliminás el día, los ejercicios quedan sin día asignado.`
        : `¿Eliminás "${day.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteDayMutation.mutate(day.id) },
      ]
    );
  };

  const handleAddDay = () => {
    if (!newDaySelected) return;
    const nextDay = sortedDays.length > 0 ? Math.max(...sortedDays.map((d) => d.day_number)) + 1 : 1;
    createDayMutation.mutate(
      { day_number: nextDay, name: newDaySelected },
      { onSuccess: () => { setAddingDay(false); setNewDaySelected(''); } }
    );
  };

  const handleShare = async () => {
    if (!user) return;
    setSharing(true);
    try {
      const shared = await shareRoutine(id, user.id);
      const message = `Te comparto mi rutina "${routine?.name}" en Spotter 💪\nCódigo: ${shared.share_code}`;
      const result = await Share.share({ message });
      if (result.action === Share.dismissedAction) {
        await Clipboard.setStringAsync(shared.share_code);
        Toast.show({ type: 'success', text1: 'Código copiado', text2: shared.share_code });
      }
    } catch {
      Toast.show({ type: 'error', text1: 'Error al compartir' });
    } finally {
      setSharing(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const exercises = (routine?.routine_exercises ?? []) as RoutineExercise[];
  const sortedDays = ((routine?.routine_days ?? []) as RoutineDay[]).sort(
    (a, b) => a.day_number - b.day_number
  );
  const totalDays = sortedDays.length;
  const hasDays = totalDays > 0;

  const exercisesByDay = exercises.reduce<Record<number, RoutineExercise[]>>((acc, e) => {
    const d = e.day_number ?? 1;
    if (!acc[d]) acc[d] = [];
    acc[d].push(e);
    return acc;
  }, {});

  // Ejercicios sin día asignado (day_number sin entrada en routine_days)
  const assignedDayNumbers = new Set(sortedDays.map((d) => d.day_number));
  const unassignedExercises = exercises.filter((e) => !assignedDayNumbers.has(e.day_number ?? 1));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[typography.titleMd, { color: colors.onSurface, flex: 1, marginLeft: 12 }]} numberOfLines={1}>
          {routine?.name}
        </Text>
        <TouchableOpacity onPress={handleShare} disabled={sharing} style={{ marginRight: 12 }}>
          <Ionicons name="share-outline" size={22} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/(tabs)/routines/add-exercise', params: { routineId: id } })}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.primaryContainer} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {routine?.description ? (
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginBottom: 16 }]}>
            {routine.description}
          </Text>
        ) : null}

        {/* Días nombrados */}
        {hasDays && (
          <View style={{ gap: 24 }}>
            {sortedDays.map((day) => (
              <View key={day.id}>
                <View style={styles.dayHeader}>
                  <TouchableOpacity
                    style={styles.dayTitleRow}
                    onPress={() => { setEditingDay(day); setEditingDaySelected(day.name); }}
                  >
                    <Text style={[typography.titleSm, { color: colors.primary }]}>{day.name}</Text>
                    <Ionicons name="pencil-outline" size={14} color={colors.primary} style={{ marginLeft: 6 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteDay(day)}>
                    <Ionicons name="trash-outline" size={16} color={colors.error} />
                  </TouchableOpacity>
                </View>

                {(exercisesByDay[day.day_number] ?? []).length === 0 ? (
                  <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, paddingVertical: 8 }]}>
                    Sin ejercicios — tocá + para agregar
                  </Text>
                ) : (
                  <View style={styles.exerciseList}>
                    {(exercisesByDay[day.day_number] ?? [])
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((item) => (
                        <ExerciseListItem
                          key={item.id}
                          item={item}
                          days={sortedDays}
                          onRemove={() => handleRemoveExercise(item)}
                          onEdit={(payload) => handleEditExercise(item, payload)}
                        />
                      ))}
                  </View>
                )}
              </View>
            ))}

            {/* Ejercicios sin día */}
            {unassignedExercises.length > 0 && (
              <View>
                <Text style={[typography.titleSm, { color: colors.onSurfaceVariant, marginBottom: 10 }]}>
                  Sin día asignado
                </Text>
                <View style={styles.exerciseList}>
                  {unassignedExercises
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((item) => (
                      <ExerciseListItem
                        key={item.id}
                        item={item}
                        days={sortedDays}
                        onRemove={() => handleRemoveExercise(item)}
                        onEdit={(payload) => handleEditExercise(item, payload)}
                      />
                    ))}
                </View>
              </View>
            )}

            {/* Agregar día */}
            <TouchableOpacity style={styles.addDayBtn} onPress={() => setAddingDay(true)}>
              <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
              <Text style={[typography.labelMd, { color: colors.primary, marginLeft: 6 }]}>Agregar día</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sin días configurados — lista plana */}
        {!hasDays && exercises.length === 0 && (
          <View style={styles.emptyExercises}>
            <Ionicons name="add-circle-outline" size={40} color={colors.outlineVariant} />
            <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 12 }]}>
              Sin ejercicios
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 }]}>
              Tocá el + para agregar ejercicios a tu rutina
            </Text>
            <TouchableOpacity style={[styles.addDayBtn, { marginTop: 20 }]} onPress={() => setAddingDay(true)}>
              <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
              <Text style={[typography.labelMd, { color: colors.primary, marginLeft: 6 }]}>Organizar por días</Text>
            </TouchableOpacity>
          </View>
        )}

        {!hasDays && exercises.length > 0 && (
          <View style={{ gap: 16 }}>
            <View style={styles.exerciseList}>
              {exercises
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((item) => (
                  <ExerciseListItem
                    key={item.id}
                    item={item}
                    days={sortedDays}
                    onRemove={() => handleRemoveExercise(item)}
                    onEdit={(payload) => handleEditExercise(item, payload)}
                  />
                ))}
            </View>
            <TouchableOpacity style={styles.addDayBtn} onPress={() => setAddingDay(true)}>
              <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
              <Text style={[typography.labelMd, { color: colors.primary, marginLeft: 6 }]}>Organizar por días</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {exercises.length > 0 && (
        <View style={styles.footer}>
          <Button label="Iniciar Entrenamiento" onPress={handleStartWorkout} size="lg" style={{ width: '100%' }} />
        </View>
      )}

      {/* Modal editar día */}
      <Modal visible={!!editingDay} transparent animationType="fade" onRequestClose={() => setEditingDay(null)}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={[typography.titleMd, { color: colors.onSurface, marginBottom: 16 }]}>Cambiar día</Text>
            <View style={styles.weekGrid}>
              {WEEK_DAYS.map((d) => {
                const alreadyUsed = sortedDays.some((sd) => sd.name === d && sd.id !== editingDay?.id);
                const isSelected = editingDaySelected === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[styles.weekChip, isSelected && styles.weekChipActive, alreadyUsed && styles.weekChipDisabled]}
                    onPress={() => !alreadyUsed && setEditingDaySelected(d)}
                    disabled={alreadyUsed}
                  >
                    <Text style={[typography.labelMd, { color: isSelected ? colors.onPrimary : alreadyUsed ? colors.outlineVariant : colors.onSurface }]}>
                      {d}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={[styles.modalActions, { marginTop: 20 }]}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => setEditingDay(null)}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnSave, !editingDaySelected && { opacity: 0.4 }]} onPress={handleSaveDayName} disabled={!editingDaySelected}>
                <Text style={[typography.labelMd, { color: colors.onPrimary }]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal agregar día */}
      <Modal visible={addingDay} transparent animationType="fade" onRequestClose={() => setAddingDay(false)}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={[typography.titleMd, { color: colors.onSurface, marginBottom: 16 }]}>Agregar día</Text>
            <View style={styles.weekGrid}>
              {WEEK_DAYS.map((d) => {
                const alreadyUsed = sortedDays.some((sd) => sd.name === d);
                const isSelected = newDaySelected === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[styles.weekChip, isSelected && styles.weekChipActive, alreadyUsed && styles.weekChipDisabled]}
                    onPress={() => !alreadyUsed && setNewDaySelected(d)}
                    disabled={alreadyUsed}
                  >
                    <Text style={[typography.labelMd, { color: isSelected ? colors.onPrimary : alreadyUsed ? colors.outlineVariant : colors.onSurface }]}>
                      {d}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={[styles.modalActions, { marginTop: 20 }]}>
              <TouchableOpacity style={styles.btnCancel} onPress={() => { setAddingDay(false); setNewDaySelected(''); }}>
                <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnSave, !newDaySelected && { opacity: 0.4 }]} onPress={handleAddDay} disabled={!newDaySelected}>
                <Text style={[typography.labelMd, { color: colors.onPrimary }]}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  navBar: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingHorizontal: 24 },
  content: { padding: 24, paddingTop: 0, flexGrow: 1 },
  exerciseList: { gap: 10 },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayTitleRow: { flexDirection: 'row', alignItems: 'center' },
  addDayBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  emptyExercises: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
  footer: { padding: 24, paddingTop: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
  },
  weekGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  weekChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
  },
  weekChipActive: {
    backgroundColor: colors.primary,
  },
  weekChipDisabled: {
    opacity: 0.35,
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
