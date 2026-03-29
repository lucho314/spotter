import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { syncPendingWorkouts } from '@/services/workout-sync';

/**
 * Subscribes to network connectivity changes.
 * - Shows an informational toast when the device goes offline.
 * - When the connection is restored, syncs any pending workouts and
 *   invalidates the workout-sessions query cache.
 */
export function useOfflineSync() {
  const queryClient = useQueryClient();
  const wasOfflineRef = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isOnline =
        state.isConnected === true && state.isInternetReachable !== false;

      if (!isOnline) {
        if (!wasOfflineRef.current) {
          wasOfflineRef.current = true;
          Toast.show({
            type: 'info',
            text1: 'Sin conexión',
            text2: 'Los entrenamientos se guardarán localmente',
          });
        }
      } else if (wasOfflineRef.current) {
        wasOfflineRef.current = false;
        syncPendingWorkouts()
          .then((count) => {
            if (count > 0) {
              queryClient.invalidateQueries({ queryKey: ['workout-sessions'] });
              Toast.show({
                type: 'success',
                text1: `${count} entrenamiento${count > 1 ? 's' : ''} sincronizado${count > 1 ? 's' : ''}`,
              });
            }
          })
          .catch(() => {});
      }
    });

    return unsubscribe;
  }, [queryClient]);
}
