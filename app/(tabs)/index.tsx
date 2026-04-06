import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { useAuth } from '@/lib/auth';
import { useDashboardStats } from '@/hooks/queries/use-dashboard';
import { useRoutines } from '@/hooks/queries/use-routines';
import { Routine, RoutineDay } from '@/types';

const WEEK_ORDER: Record<string, number> = {
  Lunes: 1, Martes: 2, Miércoles: 3, Jueves: 4, Viernes: 5, Sábado: 6, Domingo: 7,
};

function sortByDay(routines: Routine[]): Routine[] {
  return [...routines].sort((a, b) => {
    const daysA = (a.routine_days ?? []) as RoutineDay[];
    const daysB = (b.routine_days ?? []) as RoutineDay[];
    const orderA = daysA.length ? Math.min(...daysA.map((d) => WEEK_ORDER[d.name] ?? 99)) : 99;
    const orderB = daysB.length ? Math.min(...daysB.map((d) => WEEK_ORDER[d.name] ?? 99)) : 99;
    return orderA - orderB;
  });
}

export default function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const displayName = user?.user_metadata?.full_name ?? user?.user_metadata?.display_name ?? 'Atleta';

  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useDashboardStats();
  const { data: routines, isLoading: routinesLoading, refetch: refetchRoutines } = useRoutines();

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchStats(), refetchRoutines()]);
    setRefreshing(false);
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'BUEN DÍA';
    if (h < 18) return 'BUENAS TARDES';
    return 'BUENAS NOCHES';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primaryContainer} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[typography.labelSm, styles.greeting]}>{greeting()}</Text>
            <Text style={[typography.headlineLg, { color: colors.onSurface }]}>{displayName}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => {/* future profile screen */}}
          >
            <Ionicons name="person-outline" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatsCard
            label="ESTA SEMANA"
            value={stats?.sessionsThisWeek ?? 0}
            unit="sesiones"
            accent="lime"
          />
          <StatsCard
            label="ÚLTIMA SESIÓN"
            value={stats?.sessionsThisWeek ? '✓' : '-'}
            accent="cyan"
          />
        </View>

        {/* CTA */}
        <Button
          label="Iniciar Entrenamiento"
          onPress={() => router.push('/(tabs)/routines')}
          size="lg"
          style={styles.cta}
        />

        {/* Last PR */}
        {stats?.latestPR && (
          <Card style={styles.prCard}>
            <View style={styles.prHeader}>
              <Ionicons name="trophy" size={20} color={colors.primaryContainer} />
              <Text style={[typography.labelMd, { color: colors.primaryContainer }]}>ÚLTIMO PR</Text>
            </View>
            <Text style={[typography.titleLg, { color: colors.onSurface }]}>
              {(stats.latestPR as any).exercises?.name}
            </Text>
            <Text style={[typography.displayMd, { color: colors.primaryContainer }]}>
              {stats.latestPR.estimated_1rm.toFixed(1)}
              <Text style={[typography.titleMd, { color: colors.onSurfaceVariant }]}> kg (1RM est.)</Text>
            </Text>
          </Card>
        )}

        {/* Routines quick access */}
        {(routines?.length ?? 0) > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[typography.titleMd, { color: colors.onSurface }]}>Mis Rutinas</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/routines')}>
                <Text style={[typography.labelLg, { color: colors.secondary }]}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            {sortByDay(routines!).slice(0, 3).map((r) => {
              const days = ((r.routine_days ?? []) as RoutineDay[]).sort(
                (a, b) => (WEEK_ORDER[a.name] ?? 99) - (WEEK_ORDER[b.name] ?? 99)
              );
              return (
                <TouchableOpacity
                  key={r.id}
                  style={styles.quickRoutine}
                  onPress={() => router.push(`/(tabs)/routines/${r.id}`)}
                  activeOpacity={0.8}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.titleMd, { color: colors.onSurface }]}>{r.name}</Text>
                    {days.length > 0 && (
                      <Text style={[typography.labelMd, { color: colors.primary, marginTop: 2 }]}>
                        {days.map((d) => d.name).join(' · ')}
                      </Text>
                    )}
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.onSurfaceVariant} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Empty state */}
        {!routines?.length && !routinesLoading && (
          <Card style={styles.emptyCard}>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>
              ¡Empezá ahora!
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>
              Creá tu primera rutina para comenzar a registrar tus entrenamientos.
            </Text>
            <Button
              label="Crear rutina"
              variant="secondary"
              onPress={() => router.push('/(tabs)/routines/create')}
              style={{ marginTop: 12 }}
            />
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingTop: 32, gap: 20, paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greeting: { color: colors.onSurfaceVariant, letterSpacing: 3 },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 12 },
  cta: { width: '100%' },
  prCard: { gap: 6 },
  prHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  section: { gap: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  quickRoutine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceHighest,
    borderRadius: 16,
    padding: 16,
  },
  emptyCard: { gap: 4 },
});
