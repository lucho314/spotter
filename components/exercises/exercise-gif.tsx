import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface ExerciseGifProps {
  gifUrl: string | null;
  size?: number;
}

export function ExerciseGif({ gifUrl, size = 280 }: ExerciseGifProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!gifUrl || error) {
    return (
      <View style={[styles.placeholder, { width: size, height: size }]}>
        <Ionicons name="barbell-outline" size={48} color={colors.outlineVariant} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={colors.primaryContainer} />
        </View>
      )}
      <Image
        source={{ uri: gifUrl }}
        style={{ width: size, height: size }}
        resizeMode="contain"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  placeholder: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
    zIndex: 1,
  },
});
