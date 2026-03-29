import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface RestTimerProps {
  seconds: number;
  onFinish: () => void;
  onSkip: () => void;
}

export function RestTimer({ seconds, onFinish, onSkip }: RestTimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onFinish();
      return;
    }
    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining, onFinish]);

  return (
    <View style={styles.container}>
      <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, letterSpacing: 2 }]}>
        DESCANSO
      </Text>
      <Text style={[typography.displayLg, { color: colors.secondary }]}>{remaining}s</Text>
      <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
        <Ionicons name="play-skip-forward" size={20} color={colors.onSurface} />
        <Text style={[typography.labelLg, { color: colors.onSurface }]}>Saltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    padding: 20,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceHighest,
  },
});
