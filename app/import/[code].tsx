import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { importRoutine, getSharedRoutineByCode } from '@/services/sharing';
import { useAuth } from '@/lib/auth';
import { useQueryClient } from '@tanstack/react-query';
import { routineKeys } from '@/hooks/queries/use-routines';

export default function ImportRoutineScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [sharedData, setSharedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    getSharedRoutineByCode(code)
      .then((data) => {
        if (!data) setError('Código inválido o expirado');
        else setSharedData(data);
      })
      .catch(() => setError('Error al buscar la rutina'))
      .finally(() => setLoading(false));
  }, [code]);

  const handleImport = async () => {
    if (!user) return;
    setImporting(true);
    try {
      const newRoutine = await importRoutine(code, user.id);
      qc.invalidateQueries({ queryKey: routineKeys.lists() });
      Toast.show({ type: 'success', text1: 'Rutina importada' });
      router.replace(`/(tabs)/routines/${newRoutine.id}`);
    } catch (err: any) {
      Toast.show({ type: 'error', text1: err.message ?? 'Error al importar' });
    } finally {
      setImporting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color={colors.primaryContainer} size="large" />
        ) : error ? (
          <Card>
            <Text style={[typography.titleMd, { color: colors.error }]}>{error}</Text>
            <Button label="Volver" variant="secondary" onPress={() => router.back()} style={{ marginTop: 12 }} />
          </Card>
        ) : sharedData ? (
          <Card style={styles.card}>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, letterSpacing: 2 }]}>
              RUTINA COMPARTIDA
            </Text>
            <Text style={[typography.headlineSm, { color: colors.onSurface }]}>
              {sharedData.routines?.name}
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
              {sharedData.routines?.routine_exercises?.length ?? 0} ejercicios
            </Text>
            <Button
              label="Importar rutina"
              onPress={handleImport}
              loading={importing}
              style={{ marginTop: 8 }}
            />
            <Button
              label="Cancelar"
              variant="ghost"
              onPress={() => router.back()}
            />
          </Card>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  card: { gap: 10 },
});
