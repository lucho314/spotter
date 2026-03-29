import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { GoalSelector } from '@/components/templates/goal-selector';
import { DaysSelector } from '@/components/templates/days-selector';
import { TemplateCard } from '@/components/templates/template-card';
import { useTemplates } from '@/hooks/queries/use-templates';
import { FitnessGoal } from '@/types';

export default function TemplatesScreen() {
  const router = useRouter();
  const [goal, setGoal] = useState<FitnessGoal | undefined>();
  const [days, setDays] = useState<number | undefined>();

  const { data: templates, isLoading } = useTemplates(goal, days);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[typography.headlineMd, { color: colors.onSurface }]}>
          Explorar Plantillas
        </Text>
      </View>

      <FlatList
        data={templates}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.filters}>
            <GoalSelector selected={goal} onSelect={setGoal} />
            <DaysSelector selected={days} onSelect={setDays} />
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              color={colors.primaryContainer}
              style={{ marginTop: 48 }}
            />
          ) : (
            <View style={styles.empty}>
              <Ionicons name="search-outline" size={40} color={colors.outlineVariant} />
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 12 }]}>
                No hay plantillas con esos filtros
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <TemplateCard
            template={item}
            onPress={() => router.push(`/(tabs)/routines/templates/${item.id}`)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: {
    gap: 12,
    paddingBottom: 16,
  },
  list: {
    padding: 24,
    paddingTop: 8,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 48,
  },
});
