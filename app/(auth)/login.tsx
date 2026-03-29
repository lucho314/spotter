import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { useAuth } from '@/lib/auth';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Error al iniciar sesión',
        text2: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.displayMd, styles.logo]}>SPOTTER</Text>
        <Text style={[typography.bodyMd, styles.subtitle]}>
          Tu diario de entrenamiento
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.googleButton, loading && styles.googleButtonDisabled]}
          onPress={handleGoogle}
          disabled={loading}
          activeOpacity={0.8}
        >
          <AntDesign name="google" size={20} color={colors.onSurface} />
          <Text style={styles.googleButtonText}>
            {loading ? 'Conectando...' : 'Continuar con Google'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    gap: 64,
  },
  header: { alignItems: 'center', gap: 12 },
  logo: { color: colors.primaryContainer, letterSpacing: 8 },
  subtitle: { color: colors.onSurfaceVariant },
  actions: { width: '100%', gap: 16 },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.surfaceLow,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  googleButtonDisabled: { opacity: 0.5 },
  googleButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: colors.onSurface,
  },
});
