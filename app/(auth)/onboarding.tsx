import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function OnboardingScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const displayName = user?.user_metadata?.display_name ?? 'Atleta';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[typography.labelSm, styles.badge]}>BIENVENIDO/A</Text>
        <Text style={[typography.displayLg, styles.name]}>{displayName}</Text>
        <Text style={[typography.bodyLg, styles.desc]}>
          Spotter es tu compañero de entrenamiento. Registrá tus rutinas, seguí tu progreso y superá tus límites.
        </Text>
      </View>
      <Button
        label="Empezar"
        onPress={() => router.replace('/(tabs)')}
        size="lg"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'space-between',
    paddingBottom: 48,
  },
  content: { flex: 1, justifyContent: 'center', gap: 16 },
  badge: {
    color: colors.primaryContainer,
    letterSpacing: 3,
  },
  name: { color: colors.onSurface },
  desc: { color: colors.onSurfaceVariant },
  button: { width: '100%' },
});
