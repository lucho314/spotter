import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function ImportLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="[code]" />
    </Stack>
  );
}
