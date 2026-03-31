import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ActiveSet } from '@/stores/workout-store';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface SetRowProps {
  set: ActiveSet;
  index: number;
  onWeightChange: (value: string) => void;
  onRepsChange: (value: string) => void;
  onComplete: () => void;
  onUncomplete: () => void;
}

export function SetRow({ set, index, onWeightChange, onRepsChange, onComplete, onUncomplete }: SetRowProps) {
  // Local state avoids the controlled TextInput flicker caused by the
  // store → parent re-render cycle on every keystroke.
  const [weight, setWeight] = useState(set.weight_kg);
  const [reps, setReps] = useState(set.reps);

  const handleWeightChange = (v: string) => {
    setWeight(v);
    onWeightChange(v);
  };

  const handleRepsChange = (v: string) => {
    setReps(v);
    onRepsChange(v);
  };

  const handleComplete = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (set.completed) {
      onUncomplete();
    } else {
      onComplete();
    }
  };

  return (
    <View style={[styles.row, set.completed && styles.rowCompleted]}>
      <Text style={[typography.labelMd, styles.setNum]}>{index + 1}</Text>

      <View style={styles.inputGroup}>
        {set.completed ? (
          <Text style={styles.valueDone}>{weight}</Text>
        ) : (
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={handleWeightChange}
            keyboardType="decimal-pad"
            placeholder="kg"
            placeholderTextColor={colors.onSurfaceVariant}
          />
        )}
        <Text style={styles.separator}>×</Text>
        {set.completed ? (
          <Text style={styles.valueDone}>{reps}</Text>
        ) : (
          <TextInput
            style={styles.input}
            value={reps}
            onChangeText={handleRepsChange}
            keyboardType="number-pad"
            placeholder="reps"
            placeholderTextColor={colors.onSurfaceVariant}
          />
        )}
      </View>

      <TouchableOpacity
        style={[styles.checkButton, set.completed && styles.checkButtonDone]}
        onPress={handleComplete}
      >
        <Ionicons
          name={set.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={28}
          color={set.completed ? colors.primaryContainer : colors.onSurfaceVariant}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  rowCompleted: {
    backgroundColor: 'rgba(209, 252, 0, 0.06)',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryContainer,
  },
  setNum: {
    color: colors.onSurfaceVariant,
    width: 20,
    textAlign: 'center',
  },
  inputGroup: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.onSurface,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  valueDone: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.primaryContainer,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  separator: { color: colors.onSurfaceVariant, fontFamily: 'Inter_400Regular', fontSize: 16 },
  checkButton: { padding: 4 },
  checkButtonDone: {},
});
