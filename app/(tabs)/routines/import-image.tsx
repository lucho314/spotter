import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useQueryClient } from '@tanstack/react-query';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { parseRoutineFromImage } from '@/services/ai-routine-import';
import { routineKeys } from '@/hooks/queries/use-routines';

export default function ImportImageScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const qc = useQueryClient();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [loading, setLoading] = useState(false);

  const pickImage = async (fromCamera: boolean) => {
    const ImagePicker = await import('expo-image-picker');

    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permiso necesario', `Se necesita acceso a ${fromCamera ? 'la cámara' : 'la galería'}.`);
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'] as any,
          quality: 0.7,
          base64: true,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'] as any,
          quality: 0.7,
          base64: true,
        });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      setImageBase64(asset.base64 ?? null);
      setImageMimeType((asset as any).mimeType ?? 'image/jpeg');
    }
  };

  const handleImport = async () => {
    if (!imageBase64 || !user) return;

    setLoading(true);
    try {
      const { routine_id, routine_name } = await parseRoutineFromImage({
        imageBase64,
        imageMimeType,
        userId: user.id,
      });

      await qc.invalidateQueries({ queryKey: routineKeys.lists() });
      Toast.show({ type: 'success', text1: `"${routine_name}" creada` });
      router.replace(`/(tabs)/routines/${routine_id}`);
    } catch (err: any) {
      console.error('[import-image] Error completo:', err.message);
      Toast.show({ type: 'error', text1: 'Error al importar', text2: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} disabled={loading}>
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[typography.titleMd, { color: colors.onSurface, marginLeft: 12 }]}>
          Importar rutina con IA
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {!imageUri ? (
          <View style={styles.emptyState}>
            <Ionicons name="camera-outline" size={56} color={colors.outlineVariant} />
            <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 16 }]}>
              Sacá una foto de tu rutina
            </Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 6 }]}>
              La IA va a extraer los ejercicios y crear la rutina automáticamente
            </Text>

            <View style={styles.pickersRow}>
              <TouchableOpacity style={styles.pickerBtn} onPress={() => pickImage(true)}>
                <Ionicons name="camera" size={28} color={colors.primary} />
                <Text style={[typography.labelMd, { color: colors.primary, marginTop: 6 }]}>Cámara</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pickerBtn} onPress={() => pickImage(false)}>
                <Ionicons name="images" size={28} color={colors.primary} />
                <Text style={[typography.labelMd, { color: colors.primary, marginTop: 6 }]}>Galería</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="contain" />

            <TouchableOpacity
              style={styles.changeImage}
              onPress={() => { setImageUri(null); setImageBase64(null); }}
              disabled={loading}
            >
              <Ionicons name="refresh-outline" size={16} color={colors.onSurfaceVariant} />
              <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginLeft: 4 }]}>
                Cambiar imagen
              </Text>
            </TouchableOpacity>

            {loading ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator color={colors.primary} size="large" />
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 12 }]}>
                  Analizando rutina con IA...
                </Text>
                <Text style={[typography.labelMd, { color: colors.outlineVariant, marginTop: 4 }]}>
                  Puede tardar unos segundos
                </Text>
              </View>
            ) : (
              <Button
                label="Importar rutina"
                onPress={handleImport}
                size="lg"
                style={{ width: '100%', marginTop: 8 }}
              />
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  navBar: { flexDirection: 'row', alignItems: 'center', padding: 16, paddingHorizontal: 24 },
  content: { flexGrow: 1, padding: 24 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
  pickersRow: { flexDirection: 'row', gap: 16, marginTop: 32 },
  pickerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    padding: 24,
    width: 120,
  },
  previewContainer: { flex: 1, alignItems: 'center', gap: 16 },
  preview: {
    width: '100%',
    height: 400,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
  },
  changeImage: { flexDirection: 'row', alignItems: 'center' },
  loadingBox: { alignItems: 'center', paddingVertical: 24 },
});
