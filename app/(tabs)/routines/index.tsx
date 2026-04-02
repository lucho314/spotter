import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { RoutineCard } from '@/components/routines/routine-card';
import { useRoutines, useArchiveRoutine } from '@/hooks/queries/use-routines';
import { Routine } from '@/types';

export default function RoutinesScreen() {
  const router = useRouter();
  const { data: routines, isLoading } = useRoutines();
  const archiveMutation = useArchiveRoutine();
  const [showImport, setShowImport] = useState(false);
  const [importCode, setImportCode] = useState('');

  const handleImport = () => {
    const code = importCode.trim().toUpperCase();
    if (code.length < 6) {
      Toast.show({ type: 'error', text1: 'Ingresá un código válido' });
      return;
    }
    setShowImport(false);
    setImportCode('');
    router.push(`/import/${code}`);
  };

  const handleArchive = useCallback((routine: Routine) => {
    Alert.alert(
      'Archivar rutina',
      `¿Archivás "${routine.name}"? Podés recuperarla después.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Archivar',
          style: 'destructive',
          onPress: async () => {
            try {
              await archiveMutation.mutateAsync(routine.id);
              Toast.show({ type: 'success', text1: 'Rutina archivada' });
            } catch {
              Toast.show({ type: 'error', text1: 'Error al archivar' });
            }
          },
        },
      ]
    );
  }, [archiveMutation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={[typography.headlineMd, { color: colors.onSurface }]}>Mis Rutinas</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => setShowImport((v) => !v)}
            style={[styles.iconButton, showImport && styles.iconButtonActive]}
          >
            <Ionicons name="download-outline" size={20} color={showImport ? colors.onPrimary : colors.primaryContainer} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/routines/create')}
            style={styles.iconButton}
          >
            <Ionicons name="add" size={24} color={colors.primaryContainer} />
          </TouchableOpacity>
        </View>
      </View>

      {showImport && (
        <View style={styles.importBar}>
          <TextInput
            style={styles.importInput}
            value={importCode}
            onChangeText={(v) => setImportCode(v.toUpperCase())}
            placeholder="Código (ej: K7MN3QXP)"
            placeholderTextColor={colors.onSurfaceVariant}
            autoCapitalize="characters"
            autoCorrect={false}
            autoFocus
            returnKeyType="go"
            onSubmitEditing={handleImport}
          />
          <TouchableOpacity style={styles.importConfirm} onPress={handleImport}>
            <Ionicons name="arrow-forward" size={20} color={colors.onPrimary} />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => router.push('/(tabs)/routines/templates')}
        activeOpacity={0.8}
      >
        <View style={styles.exploreBadge}>
          <Ionicons name="sparkles" size={14} color={colors.onPrimary} />
          <Text style={[typography.labelSm, { color: colors.onPrimary }]}>NUEVO</Text>
        </View>
        <Text style={[typography.titleMd, { color: colors.onSurface, flex: 1 }]}>
          Explorar plantillas
        </Text>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
          12 programas
        </Text>
        <Ionicons name="chevron-forward" size={18} color={colors.primaryContainer} />
      </TouchableOpacity>

      {isLoading ? (
        <View style={styles.center}>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Cargando...</Text>
        </View>
      ) : !routines?.length ? (
        <View style={styles.center}>
          <Ionicons name="barbell-outline" size={48} color={colors.outlineVariant} />
          <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 16 }]}>
            Sin rutinas todavía
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 }]}>
            Creá tu primera rutina para empezar a entrenar
          </Text>
          <Button
            label="Explorar plantillas"
            onPress={() => router.push('/(tabs)/routines/templates')}
            style={{ marginTop: 24 }}
          />
          <Button
            label="Crear rutina"
            variant="ghost"
            onPress={() => router.push('/(tabs)/routines/create')}
            style={{ marginTop: 8 }}
          />
        </View>
      ) : (
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <RoutineCard
              routine={item}
              exerciseCount={item.routine_exercises?.length ?? 0}
              onPress={() => router.push(`/(tabs)/routines/${item.id}`)}
              onLongPress={() => handleArchive(item)}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: colors.primaryContainer,
  },
  importBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    gap: 8,
  },
  importInput: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.onSurface,
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  importConfirm: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 14,
    padding: 14,
    gap: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.primaryContainer,
  },
  exploreBadge: {
    flexDirection: 'row',
    backgroundColor: colors.primaryContainer,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 3,
    alignItems: 'center',
  },
  list: { padding: 24, paddingTop: 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 4 },
});
