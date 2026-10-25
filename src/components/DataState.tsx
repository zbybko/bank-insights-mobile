import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';

export function DataState({ loading, error, onRetry }: { loading: boolean; error: string | null; onRetry: () => void }) {
  if (loading) return <View style={styles.state}><ActivityIndicator color={colors.mint} /><Text style={styles.text}>Loading your month…</Text></View>;
  if (!error) return null;
  return <View style={styles.state}><Text style={styles.error}>{error}</Text>
    <Pressable onPress={onRetry} accessibilityRole="button" style={styles.button}><Text style={styles.text}>Try again</Text></Pressable>
  </View>;
}
const styles = StyleSheet.create({
  state: { padding: 28, alignItems: 'center', gap: 14 },
  text: { color: colors.muted, fontSize: 14 },
  error: { color: colors.error, textAlign: 'center', lineHeight: 21 },
  button: { borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 12 },
});
