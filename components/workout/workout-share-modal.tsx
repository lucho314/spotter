import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import Toast from 'react-native-toast-message';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import {
  shareWorkoutAsPdf,
  buildStoryExportData,
  generateStoryCanvasHtml,
} from '@/services/workout-export';

interface ShareModalSession {
  started_at: string;
  completed_at?: string | null;
  routines?: { name: string } | null;
  workout_sets?: Array<{
    exercise_id: number;
    set_number: number;
    weight_kg: number;
    reps: number;
    rpe?: number | null;
    exercises?: { name: string } | null;
  }>;
}

interface WorkoutShareModalProps {
  visible: boolean;
  onClose: () => void;
  session: ShareModalSession;
}

export function WorkoutShareModal({ visible, onClose, session }: WorkoutShareModalProps) {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingStory, setLoadingStory] = useState(false);
  const [storyHtml, setStoryHtml] = useState<string | null>(null);
  const processingRef = useRef(false);

  const handleSharePdf = async () => {
    setLoadingPdf(true);
    try {
      await shareWorkoutAsPdf(session);
      onClose();
    } catch {
      Toast.show({ type: 'error', text1: 'Error al generar el PDF' });
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleShareStory = () => {
    if (processingRef.current) return;
    processingRef.current = true;
    setLoadingStory(true);
    // Build canvas HTML and mount WebView — result comes via onMessage
    const data = buildStoryExportData(session);
    setStoryHtml(generateStoryCanvasHtml(data));
  };

  const handleWebViewMessage = useCallback(
    async (event: WebViewMessageEvent) => {
      setStoryHtml(null);
      try {
        const raw = event.nativeEvent.data;
        let payload: { ok: boolean; data?: string; error?: string };
        try {
          payload = JSON.parse(raw);
        } catch {
          throw new Error('Canvas response invalid: ' + raw.slice(0, 100));
        }

        if (!payload.ok) throw new Error('Canvas error: ' + payload.error);

        const base64 = (payload.data ?? '').replace(/^data:image\/jpeg;base64,/, '');
        if (!base64) throw new Error('Canvas returned empty image');

        const fileUri = (FileSystem.cacheDirectory ?? '') + 'spotter-story.jpg';
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: 'base64',
        });
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Compartir historia',
          UTI: 'public.jpeg',
        });
        onClose();
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error('[StoryShare]', msg);
        Toast.show({ type: 'error', text1: 'Error al generar la imagen', text2: msg });
      } finally {
        setLoadingStory(false);
        processingRef.current = false;
      }
    },
    [onClose]
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Hidden WebView for canvas rendering — off-screen */}
      {storyHtml ? (
        <WebView
          source={{ html: storyHtml }}
          style={styles.hiddenWebView}
          onMessage={handleWebViewMessage}
          onError={(e) => {
            const msg = e.nativeEvent.description ?? 'WebView error';
            console.error('[StoryShare WebView]', msg);
            Toast.show({ type: 'error', text1: 'Error al generar la imagen', text2: msg });
            setStoryHtml(null);
            setLoadingStory(false);
            processingRef.current = false;
          }}
          scrollEnabled={false}
          javaScriptEnabled
        />
      ) : null}

      <View style={styles.sheet}>
        <View style={styles.handle} />

        <View style={styles.titleRow}>
          <View>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>
              Compartir entrenamiento
            </Text>
            <Text style={[typography.labelMd, { color: colors.onSurfaceVariant, marginTop: 2 }]}>
              Elegí el formato
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        <View style={styles.optionsRow}>
          {/* PDF */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={handleSharePdf}
            disabled={loadingPdf || loadingStory}
            activeOpacity={0.7}
          >
            {loadingPdf ? (
              <ActivityIndicator color={colors.primaryContainer} size="large" />
            ) : (
              <View style={[styles.optionIcon, { backgroundColor: 'rgba(209,252,0,0.1)' }]}>
                <Ionicons name="document-text-outline" size={28} color={colors.primaryContainer} />
              </View>
            )}
            <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 12 }]}>
              PDF Detallado
            </Text>
            <Text
              style={[
                typography.labelSm,
                { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 },
              ]}
            >
              Todos los sets,{'\n'}volumen y estadísticas
            </Text>
          </TouchableOpacity>

          {/* Historia */}
          <TouchableOpacity
            style={[styles.optionCard, { borderColor: 'rgba(0,227,253,0.15)' }]}
            onPress={handleShareStory}
            disabled={loadingPdf || loadingStory}
            activeOpacity={0.7}
          >
            {loadingStory ? (
              <ActivityIndicator color={colors.secondary} size="large" />
            ) : (
              <View style={[styles.optionIcon, { backgroundColor: 'rgba(0,227,253,0.1)' }]}>
                <Ionicons name="phone-portrait-outline" size={28} color={colors.secondary} />
              </View>
            )}
            <Text style={[typography.titleMd, { color: colors.onSurface, marginTop: 12 }]}>
              Historia
            </Text>
            <Text
              style={[
                typography.labelSm,
                { color: colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 },
              ]}
            >
              Imagen JPG 1080×1920{'\n'}para Instagram
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  // WebView off-screen but with actual dimensions so canvas renders
  hiddenWebView: {
    position: 'absolute',
    top: -1920,
    left: 0,
    width: 1080,
    height: 1920,
    opacity: 0,
  },
  sheet: {
    backgroundColor: colors.surfaceContainer,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    paddingTop: 12,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.outlineVariant,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    backgroundColor: colors.surfaceHighest,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(209,252,0,0.12)',
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
