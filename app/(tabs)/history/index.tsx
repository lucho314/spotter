import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { useSessions, useDeleteSession } from '@/hooks/queries/use-workouts';
import { WorkoutSession } from '@/types';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
}

function formatDuration(start: string, end: string | null) {
  if (!end) return '-';
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const min = Math.floor(ms / 60000);
  if (min < 60) return `${min} min`;
  return `${Math.floor(min / 60)}h ${min % 60}min`;
}

function SessionCard({ session, onPress, onLongPress }: { session: WorkoutSession; onPress: () => void; onLongPress: () => void }) {
  return (
    <TouchableOpacity style={styles.sessionCard} onPress={onPress} onLongPress={onLongPress} activeOpacity={0.8}>
      <View style={styles.sessionTop}>
        <Text style={[typography.titleMd, { color: colors.onSurface }]}>
          {(session as any).routines?.name ?? 'Entrenamiento libre'}
        </Text>
        <Ionicons name="chevron-forward" size={18} color={colors.onSurfaceVariant} />
      </View>
      <View style={styles.sessionMeta}>
        <View style={styles.metaChip}>
          <Ionicons name="calendar-outline" size={14} color={colors.onSurfaceVariant} />
          <Text style={[typography.labelMd, { color: colors.onSurfaceVariant }]}>
            {formatDate(session.started_at)}
          </Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="time-outline" size={14} color={colors.secondary} />
          <Text style={[typography.labelMd, { color: colors.secondary }]}>
            {formatDuration(session.started_at, session.completed_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HistoryScreen() {
  const router = useRouter();
  const { data: sessions, isLoading } = useSessions();
  const deleteMutation = useDeleteSession();

  const handleDelete = (session: WorkoutSession) => {
    Alert.alert(
      'Eliminar sesión',
      `¿Eliminás el entrenamiento del ${formatDate(session.started_at)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMutation.mutateAsync(session.id);
              Toast.show({ type: 'success', text1: 'Sesión eliminada' });
            } catch {
              Toast.show({ type: 'error', text1: 'Error al eliminar' });
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={[typography.headlineMd, { color: colors.onSurface }]}>Historial</Text>
      </View>

      {isLoading ? (
        <View style={styles.center}>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>Cargando...</Text>
        </View>
      ) : !sessions?.length ? (
        <View style={styles.center}>
          <Ionicons name="time-outline" size={48} color={colors.outlineVariant} />
          <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 16 }]}>
            Sin entrenamientos
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 }]}>
            Tus sesiones completadas aparecerán aquí
          </Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <SessionCard
              session={item}
              onPress={() => router.push(`/(tabs)/history/${item.id}`)}
              onLongPress={() => handleDelete(item)}
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
  header: { padding: 24, paddingBottom: 16 },
  list: { padding: 24, paddingTop: 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  sessionCard: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  sessionTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sessionMeta: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
