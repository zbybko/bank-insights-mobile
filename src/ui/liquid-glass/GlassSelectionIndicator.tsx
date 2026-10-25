import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import { GlassSurface } from './GlassSurface';

type Props = { position: SharedValue<number>; itemWidth: number; liquid: boolean; pressed: boolean };

// One moving material beneath stationary tab labels and hit targets.
export function GlassSelectionIndicator({ position, itemWidth, liquid, pressed }: Props) {
  const movement = useAnimatedStyle(() => ({ transform: [{ translateX: position.value }] }));
  return <Animated.View pointerEvents="none" style={[styles.indicator, { width: itemWidth }, movement]}>
    <GlassSurface style={styles.surface} radius={29} glass={liquid} active={liquid} pressed={pressed} restingColor="#435065">
      {null}
    </GlassSurface>
  </Animated.View>;
}

const styles = StyleSheet.create({
  indicator: { position: 'absolute', top: 6, bottom: 6, left: 6 },
  surface: { flex: 1 },
});
