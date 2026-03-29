import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { supabase } from '@/lib/supabase';
import { colors } from '@/constants/colors';

export default function AuthCallbackScreen() {
  const params = useLocalSearchParams<{ code?: string }>();
  const router = useRouter();

  useEffect(() => {
    const exchange = async () => {
      console.log('[Callback] params:', JSON.stringify(params));
      const code = params.code;

      if (code) {
        try {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;

          // Upsert profile con nombre de Google
          const user = data.user;
          if (user) {
            const displayName =
              typeof user.user_metadata?.full_name === 'string'
                ? user.user_metadata.full_name
                : typeof user.user_metadata?.name === 'string'
                  ? user.user_metadata.name
                  : typeof user.email === 'string'
                    ? user.email.split('@')[0]
                    : 'Usuario';

            await supabase.from('profiles').upsert({
              id: user.id,
              display_name: displayName,
            });
          }

          console.log('[Callback] Session OK, navigating to tabs');
        } catch (e) {
          console.error('[Callback] Error exchanging code:', e);
        }
      } else {
        console.log('[Callback] No code in params');
      }

      // onAuthStateChange + AuthGuard se encargan de navegar
      router.replace('/(tabs)');
    };

    exchange();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primaryContainer} />
      <Text style={styles.text}>Completando acceso...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  text: {
    color: colors.onSurfaceVariant,
    fontSize: 15,
  },
});
