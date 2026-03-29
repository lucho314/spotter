import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppStore {
  weightUnit: 'kg' | 'lb';
  setWeightUnit: (unit: 'kg' | 'lb') => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      weightUnit: 'kg',
      setWeightUnit: (unit) => set({ weightUnit: unit }),
    }),
    {
      name: 'spotter-app',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
