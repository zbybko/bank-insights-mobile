import type { ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/theme';

export function GlassCard({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <LinearGradient colors={['rgba(60,80,102,0.82)', 'rgba(37,53,70,0.92)']}
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.card, style]}>{children}</LinearGradient>;
}
const styles = StyleSheet.create({
  card: { borderRadius: 25, borderWidth: 1, borderColor: colors.border, padding: 18, overflow: 'hidden' },
});
