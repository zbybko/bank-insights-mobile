import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FinanceProvider } from '../state/FinanceContext';
import { colors } from '../theme/theme';

export default function RootLayout() {
  return <SafeAreaProvider><FinanceProvider>
    <StatusBar style="light" />
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="category/[category]" />
    </Stack>
  </FinanceProvider></SafeAreaProvider>;
}
