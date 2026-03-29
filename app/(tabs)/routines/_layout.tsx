import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';

export default function RoutinesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="add-exercise" options={{ presentation: 'modal' }} />
      <Stack.Screen name="templates/index" />
      <Stack.Screen name="templates/[id]" />
    </Stack>
  );
}
