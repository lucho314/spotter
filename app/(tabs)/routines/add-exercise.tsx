import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { useExercises, useMuscleGroups } from '@/hooks/queries/use-exercises';
import { useAddExercise, useRoutine } from '@/hooks/queries/use-routines';
import { Exercise } from '@/types';

interface ConfigState {
  exercise: Exercise;
  sets: string;
  reps: string;
  rest: string;
}

function StepControl({
  value,
  onChange,
  min,
  step = 1,
}: {
  value: string;
  onChange: (v: string) => void;
  min: number;
  step?: number;
}) {
  const num = parseInt(value, 10) || min;
  return (
    <View style={ctrl.row}>
      <TouchableOpacity
        style={ctrl.btn}
        onPress={() => onChange(String(Math.max(min, num - step)))}
      >
        <Ionicons name="remove" size={20} color={colors.onSurface} />
      </TouchableOpacity>
      <Text style={ctrl.value}>{value}</Text>
      <TouchableOpacity style={ctrl.btn} onPress={() => onChange(String(num + step))}>
        <Ionicons name="add" size={20} color={colors.onSurface} />
      </TouchableOpacity>
    </View>
  );
}

export default function AddExerciseScreen() {
  const { routineId } = useLocalSearchParams<{ routineId: string }>();
  const router = useRouter();
  const [selectedMuscleGroupId, setSelectedMuscleGroupId] = useState<number | undefined>();
  const [search, setSearch] = useState('');
  const [config, setConfig] = useState<ConfigState | null>(null);

  const { data: muscleGroups } = useMuscleGroups();
  const { data: exercises } = useExercises(selectedMuscleGroupId);
  const { data: routine } = useRoutine(routineId);
  const addMutation = useAddExercise(routineId);

  const existingExerciseIds = new Set(
    (routine?.routine_exercises ?? []).map((re: any) => re.exercise_id)
  );

  const filtered = exercises?.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  const openConfig = (exercise: Exercise) => {
    if (existingExerciseIds.has(exercise.id)) {
      Toast.show({ type: 'error', text1: 'Ejercicio ya agregado' });
      return;
    }
    setConfig({ exercise, sets: '3', reps: '10', rest: '90' });
  };

  const confirmAdd = async () => {
    if (!config) return;
    try {
      const sortOrder = routine?.routine_exercises?.length ?? 0;
      await addMutation.mutateAsync({
        exercise_id: config.exercise.id,
        sort_order: sortOrder,
        target_sets: parseInt(config.sets, 10) || 3,
        target_reps: parseInt(config.reps, 10) || 10,
        rest_seconds: parseInt(config.rest, 10) || 90,
      });
      setConfig(null);
      Toast.show({ type: 'success', text1: `${config.exercise.name} agregado` });
      router.back();
    } catch {
      Toast.show({ type: 'error', text1: 'Error al agregar ejercicio' });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[typography.titleMd, { color: colors.onSurface }]}>Catálogo de Ejercicios</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color={colors.onSurfaceVariant} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ejercicio..."
          placeholderTextColor={colors.onSurfaceVariant}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterList}
      >
        {[{ id: undefined, name: 'Todos' }, ...(muscleGroups ?? [])].map((item) => (
          <TouchableOpacity
            key={String(item.id ?? 'all')}
            style={[
              styles.filterChip,
              selectedMuscleGroupId === item.id && styles.filterChipActive,
            ]}
            onPress={() => setSelectedMuscleGroupId(item.id as number | undefined)}
          >
            <Text
              style={[
                typography.labelLg,
                {
                  color:
                    selectedMuscleGroupId === item.id
                      ? colors.onPrimary
                      : colors.onSurfaceVariant,
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.exerciseList}
        renderItem={({ item }) => {
          const alreadyAdded = existingExerciseIds.has(item.id);
          return (
            <TouchableOpacity
              style={[styles.exerciseItem, alreadyAdded && styles.exerciseItemAdded]}
              onPress={() => openConfig(item)}
              disabled={alreadyAdded}
            >
              <View style={styles.exerciseInfo}>
                <Text style={[typography.titleMd, { color: alreadyAdded ? colors.onSurfaceVariant : colors.onSurface }]}>
                  {item.name}
                </Text>
                <Text style={[typography.labelMd, { color: colors.secondary }]}>
                  {item.muscle_groups?.name} · {item.equipment}
                </Text>
              </View>
              {alreadyAdded ? (
                <Ionicons name="checkmark-circle" size={22} color={colors.primaryContainer} />
              ) : (
                <Ionicons name="add-circle-outline" size={22} color={colors.onSurfaceVariant} />
              )}
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />

      {/* Modal de configuración */}
      <Modal visible={config !== null} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={[typography.titleLg, { color: colors.onSurface }]} numberOfLines={1}>
              {config?.exercise.name}
            </Text>
            <Text style={[typography.labelMd, { color: colors.secondary, marginTop: 2, marginBottom: 24 }]}>
              {config?.exercise.muscle_groups?.name} · {config?.exercise.equipment}
            </Text>

            <View style={styles.configRows}>
              <View style={styles.configRow}>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Series</Text>
                {config && (
                  <StepControl
                    value={config.sets}
                    onChange={(v) => setConfig({ ...config, sets: v })}
                    min={1}
                  />
                )}
              </View>

              <View style={styles.configRow}>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Repeticiones</Text>
                {config && (
                  <StepControl
                    value={config.reps}
                    onChange={(v) => setConfig({ ...config, reps: v })}
                    min={1}
                  />
                )}
              </View>

              <View style={[styles.configRow, { borderBottomWidth: 0 }]}>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Descanso</Text>
                {config && (
                  <StepControl
                    value={config.rest}
                    onChange={(v) => setConfig({ ...config, rest: v })}
                    min={15}
                    step={15}
                  />
                )}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setConfig(null)}>
                <Text style={[typography.titleMd, { color: colors.onSurfaceVariant }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={confirmAdd}
                disabled={addMutation.isPending}
              >
                <Text style={[typography.titleMd, { color: colors.onPrimary }]}>
                  {addMutation.isPending ? 'Agregando...' : 'Agregar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const ctrl = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: colors.onSurface,
    minWidth: 40,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    marginHorizontal: 24,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: colors.onSurface,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  filterScroll: { flexGrow: 0, flexShrink: 0, marginBottom: 12 },
  filterList: { paddingHorizontal: 24, alignItems: 'center' },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surfaceHighest,
    marginRight: 8,
    flexShrink: 0,
  },
  filterChipActive: { backgroundColor: colors.primaryContainer },
  exerciseList: { padding: 24, paddingTop: 0 },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHighest,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  exerciseItemAdded: { opacity: 0.5 },
  exerciseInfo: { flex: 1, gap: 2 },
  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalCard: {
    backgroundColor: colors.surfaceContainer,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    paddingBottom: 40,
  },
  configRows: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLow,
  },
  modalActions: { flexDirection: 'row', gap: 12 },
  cancelBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: colors.surfaceHighest,
  },
  confirmBtn: {
    flex: 2,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: colors.primaryContainer,
  },
});
