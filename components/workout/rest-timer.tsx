import React, { useEffect, useRef, useState } from 'react';
import { AppState, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

interface RestTimerProps {
  seconds: number;
  onFinish: () => void;
  onSkip: () => void;
}

async function playBeep() {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/sounds/beep.wav')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) sound.unloadAsync();
    });
  } catch {
    // ignore audio errors silently
  }
}

export function RestTimer({ seconds, onFinish, onSkip }: RestTimerProps) {
  const endTimeRef = useRef(Date.now() + seconds * 1000);
  const [remaining, setRemaining] = useState(seconds);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  // Reset end time when seconds prop changes (new rest period)
  useEffect(() => {
    endTimeRef.current = Date.now() + seconds * 1000;
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    const update = () => {
      const left = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) {
        playBeep();
        onFinishRef.current();
      }
    };

    const interval = setInterval(update, 500);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') update();
    });

    return () => {
      clearInterval(interval);
      sub.remove();
    };
  }, []);

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
