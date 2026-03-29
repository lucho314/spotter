import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

const FITNESS_GOALS = [
  { value: 'gain_muscle', label: 'Ganar músculo' },
  { value: 'lose_weight', label: 'Perder peso' },
  { value: 'maintain', label: 'Mantener peso' },
  { value: 'improve_performance', label: 'Mejorar rendimiento' },
  { value: 'other', label: 'Otro' },
];

function goalLabel(value: string | null) {
  return FITNESS_GOALS.find((g) => g.value === value)?.label ?? '—';
}

function calcAge(birthDate: string | null) {
  if (!birthDate) return null;
  const diff = Date.now() - new Date(birthDate).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

// "AAAA-MM-DD" → "DD/MM/AAAA"
function isoToArg(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// "DD/MM/AAAA" → "AAAA-MM-DD"
function argToIso(arg: string) {
  const [d, m, y] = arg.split('/');
  return `${y}-${m}-${d}`;
}

// Auto-inserta las barras mientras escribe: "01" → "01/" → "01/03" → "01/03/"
function formatBirthInput(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  let result = digits;
  if (digits.length > 2) result = digits.slice(0, 2) + '/' + digits.slice(2);
  if (digits.length > 4) result = result.slice(0, 5) + '/' + digits.slice(4);
  return result;
}

function useProfileStats(userId: string) {
  return useQuery({
    queryKey: ['profile-stats', userId],
    queryFn: async () => {
      const [sessionsRes, prsRes, routinesRes] = await Promise.all([
        supabase
          .from('workout_sessions')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('status', 'completed'),
        supabase
          .from('personal_records')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId),
        supabase
          .from('routines')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('is_archived', false),
      ]);
      return {
        totalSessions: sessionsRes.count ?? 0,
        totalPRs: prsRes.count ?? 0,
        totalRoutines: routinesRes.count ?? 0,
      };
    },
    enabled: !!userId,
  });
}

function useProfileData(userId: string) {
  return useQuery({
    queryKey: ['profile-data', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('weight_kg, height_cm, birth_date, fitness_goal')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
}

function useUpdateProfile(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (fields: {
      weight_kg?: number | null;
      height_cm?: number | null;
      birth_date?: string | null;
      fitness_goal?: string | null;
    }) => {
      const { error } = await supabase
        .from('profiles')
        .update(fields)
        .eq('id', userId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile-data', userId] }),
  });
}

type EditField = 'weight_kg' | 'height_cm' | 'birth_date' | 'fitness_goal';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const qc = useQueryClient();
  const { data: stats } = useProfileStats(user?.id ?? '');
  const { data: profileData } = useProfileData(user?.id ?? '');
  const updateProfile = useUpdateProfile(user?.id ?? '');

  const [editField, setEditField] = useState<EditField | null>(null);
  const [editValue, setEditValue] = useState('');

  const displayName = user?.user_metadata?.full_name ?? user?.user_metadata?.display_name ?? 'Atleta';
  const email = user?.email ?? '';
  const avatarUrl = user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null;
  const initial = displayName.charAt(0).toUpperCase();

  const openEdit = (field: EditField) => {
    if (field === 'fitness_goal') {
      // Selector directo con Alert
      Alert.alert(
        'Objetivo',
        undefined,
        [
          ...FITNESS_GOALS.map((g) => ({
            text: g.label,
            onPress: () => updateProfile.mutate({ fitness_goal: g.value }),
          })),
          { text: 'Cancelar', style: 'cancel' as const },
        ]
      );
      return;
    }
    let current = '';
    if (field === 'weight_kg') current = profileData?.weight_kg?.toString() ?? '';
    if (field === 'height_cm') current = profileData?.height_cm?.toString() ?? '';
    if (field === 'birth_date') current = profileData?.birth_date ? isoToArg(profileData.birth_date) : '';
    setEditValue(current);
    setEditField(field);
  };

  const saveEdit = () => {
    if (!editField) return;
    const trimmed = editValue.trim();
    if (editField === 'weight_kg') {
      const v = parseFloat(trimmed);
      updateProfile.mutate({ weight_kg: isNaN(v) ? null : v });
    } else if (editField === 'height_cm') {
      const v = parseInt(trimmed, 10);
      updateProfile.mutate({ height_cm: isNaN(v) ? null : v });
    } else if (editField === 'birth_date') {
      const iso = trimmed.length === 10 ? argToIso(trimmed) : null;
      updateProfile.mutate({ birth_date: iso });
    }
    setEditField(null);
  };

  const handleSignOut = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que querés cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const age = calcAge(profileData?.birth_date ?? null);

  const physicalRows: { field: EditField; icon: string; label: string; value: string }[] = [
    {
      field: 'weight_kg',
      icon: 'barbell-outline',
      label: 'Peso',
      value: profileData?.weight_kg ? `${profileData.weight_kg} kg` : '—',
    },
    {
      field: 'height_cm',
      icon: 'body-outline',
      label: 'Altura',
      value: profileData?.height_cm ? `${profileData.height_cm} cm` : '—',
    },
    {
      field: 'birth_date',
      icon: 'calendar-outline',
      label: 'Edad',
      value: age ? `${age} años` : '—',
    },
    {
      field: 'fitness_goal',
      icon: 'flag-outline',
      label: 'Objetivo',
      value: goalLabel(profileData?.fitness_goal ?? null),
    },
  ];

  const editConfig: Record<Exclude<EditField, 'fitness_goal'>, { title: string; placeholder: string; keyboard: 'default' | 'numeric' | 'decimal-pad' }> = {
    weight_kg: { title: 'Peso (kg)', placeholder: 'Ej: 75.5', keyboard: 'decimal-pad' },
    height_cm: { title: 'Altura (cm)', placeholder: 'Ej: 178', keyboard: 'numeric' },
    birth_date: { title: 'Fecha de nacimiento', placeholder: 'DD/MM/AAAA', keyboard: 'numeric' },
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[typography.headlineMd, { color: colors.onSurface }]}>Perfil</Text>
        </View>

        {/* Avatar + nombre */}
        <View style={styles.profileSection}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitial}>{initial}</Text>
            </View>
          )}
          <Text style={[typography.headlineSm, { color: colors.onSurface, marginTop: 16 }]}>
            {displayName}
          </Text>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 4 }]}>
            {email}
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats?.totalSessions ?? '-'}</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, letterSpacing: 1 }]}>ENTRENOS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: colors.secondary }]}>{stats?.totalPRs ?? '-'}</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, letterSpacing: 1 }]}>PRs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{stats?.totalRoutines ?? '-'}</Text>
            <Text style={[typography.labelSm, { color: colors.onSurfaceVariant, letterSpacing: 1 }]}>RUTINAS</Text>
          </View>
        </View>

        {/* Datos físicos */}
        <View style={styles.section}>
          <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, letterSpacing: 2, marginBottom: 12 }]}>
            DATOS FÍSICOS
          </Text>
          <View style={styles.settingsList}>
            {physicalRows.map(({ field, icon, label, value }, i) => (
              <TouchableOpacity
                key={field}
                style={[styles.settingItem, i === physicalRows.length - 1 && styles.settingItemLast]}
                onPress={() => openEdit(field)}
                activeOpacity={0.7}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name={icon as any} size={20} color={colors.onSurfaceVariant} />
                  <Text style={[typography.titleMd, { color: colors.onSurface }]}>{label}</Text>
                </View>
                <View style={styles.settingRight}>
                  <Text style={[typography.bodyMd, { color: colors.secondary }]}>{value}</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.onSurfaceVariant} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Configuración */}
        <View style={styles.section}>
          <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, letterSpacing: 2, marginBottom: 12 }]}>
            CONFIGURACIÓN
          </Text>
          <View style={styles.settingsList}>
            {[
              { icon: 'notifications-outline', label: 'Notificaciones' },
              { icon: 'color-palette-outline', label: 'Tema' },
              { icon: 'language-outline', label: 'Idioma' },
            ].map(({ icon, label }, i, arr) => (
              <TouchableOpacity
                key={label}
                style={[styles.settingItem, i === arr.length - 1 && styles.settingItemLast]}
                activeOpacity={0.7}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name={icon as any} size={20} color={colors.onSurfaceVariant} />
                  <Text style={[typography.titleMd, { color: colors.onSurface }]}>{label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={[typography.titleMd, { color: colors.error }]}>Cerrar sesión</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Modal de edición */}
      <Modal visible={editField !== null && editField !== 'fitness_goal'} transparent animationType="fade">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={[typography.titleLg, { color: colors.onSurface, marginBottom: 16 }]}>
              {editField && editField !== 'fitness_goal' ? editConfig[editField].title : ''}
            </Text>
            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={(v) => setEditValue(editField === 'birth_date' ? formatBirthInput(v) : v)}
              placeholder={editField && editField !== 'fitness_goal' ? editConfig[editField].placeholder : ''}
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType={editField && editField !== 'fitness_goal' ? editConfig[editField].keyboard : 'default'}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setEditField(null)}>
                <Text style={[typography.titleMd, { color: colors.onSurfaceVariant }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.modalBtnPrimary]} onPress={saveEdit}>
                <Text style={[typography.titleMd, { color: colors.onPrimary }]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingTop: 32, gap: 28, paddingBottom: 40 },
  header: {},
  profileSection: { alignItems: 'center' },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarFallback: {
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 40,
    color: colors.onPrimary,
  },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceHighest,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 32,
    lineHeight: 38,
    color: colors.primaryContainer,
  },
  section: {},
  settingsList: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLow,
  },
  settingItemLast: { borderBottomWidth: 0 },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.surfaceHighest,
    borderRadius: 16,
    paddingVertical: 18,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: colors.surfaceHighest,
    borderRadius: 20,
    padding: 24,
  },
  modalInput: {
    backgroundColor: colors.surfaceLow,
    borderRadius: 12,
    padding: 16,
    color: colors.onSurface,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: { flexDirection: 'row', gap: 12 },
  modalBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.surfaceLow,
  },
  modalBtnPrimary: { backgroundColor: colors.primaryContainer },
});
