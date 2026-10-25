import type { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { GlassSurface } from './GlassSurface';

type Props = { children: ReactNode; accessibilityLabel: string; onPress: () => void };

export function GlassButton({ children, accessibilityLabel, onPress }: Props) {
  return <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}
    style={styles.hitArea}>
    {({ pressed }) => <GlassSurface interactive pressed={pressed} style={styles.surface} contentStyle={styles.center}>
      {children}
    </GlassSurface>}
  </Pressable>;
}

const styles = StyleSheet.create({
  hitArea: { width: 44, height: 44, flexShrink: 0 },
  surface: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
});
