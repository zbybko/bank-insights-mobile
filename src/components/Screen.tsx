import type { ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/theme';

export function Screen({ children }: { children: ReactNode }) {
  return (
    <View style={styles.outer}>
      <View style={[styles.canvas, { maxWidth: 480 }]}>
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Image
            source={require('../../assets/backgrounds/02-graphite-pearl.png')}
            resizeMode="cover"
            style={styles.background}
          />

        </View>
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>{children}</SafeAreaView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  outer: { flex: 1, backgroundColor: colors.background, alignItems: 'center' },
  canvas: { flex: 1, width: '100%', overflow: 'hidden' },
  safe: { flex: 1 },
});
