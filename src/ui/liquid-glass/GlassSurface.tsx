import { GlassView, isGlassEffectAPIAvailable, isLiquidGlassAvailable } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, type ReactNode } from 'react';
import { Platform, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  LinearTransition, ReduceMotion, useAnimatedStyle, useReducedMotion, useSharedValue, withSpring, withTiming,
} from 'react-native-reanimated';
import { GlassBackdrop } from './GlassBackdrop';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  radius?: number;
  interactive?: boolean;
  pressed?: boolean;
  active?: boolean;
  glass?: boolean;
  restingColor?: string;
};

const nativeGlass = Platform.OS === 'ios' && isGlassEffectAPIAvailable() && isLiquidGlassAvailable();
const resizeTransition = LinearTransition.springify().damping(20).stiffness(240).reduceMotion(ReduceMotion.System);

export function GlassSurface({ children, style, contentStyle, radius = 24, interactive = false,
  pressed = false, active = false, glass = true, restingColor = '#435065' }: Props) {
  const reduceMotion = useReducedMotion();
  const deformation = useSharedValue(0);
  const expansion = useSharedValue(0);
  const solidOpacity = useSharedValue(glass ? 0 : 1);
  useEffect(() => {
    solidOpacity.value = withTiming(glass ? 0 : 1, { duration: 240, reduceMotion: ReduceMotion.System });
  }, [glass, solidOpacity]);
  const solidStyle = useAnimatedStyle(() => ({ opacity: solidOpacity.value }));
  const fallbackStyle = useAnimatedStyle(() => ({ opacity: 1 - solidOpacity.value }));
  useEffect(() => {
    // Native interactive glass owns its touch physics; do not layer another bounce on it.
    deformation.value = withSpring(pressed && !nativeGlass ? 1 : 0,
      { damping: 12, stiffness: 320, mass: 0.55, reduceMotion: ReduceMotion.System });
    expansion.value = withSpring(active ? 1 : 0,
      { damping: 15, stiffness: 230, mass: 0.65, reduceMotion: ReduceMotion.System });
  }, [pressed, active, deformation, expansion]);
  const motion = useAnimatedStyle(() => ({
    transform: [
      { scaleX: reduceMotion ? 1 : 1 - deformation.value * 0.035 + expansion.value * 0.008 },
      { scaleY: reduceMotion ? 1 : 1 - deformation.value * 0.065 + expansion.value * 0.025 },
    ],
  }));
  const shape = { borderRadius: radius };
  const content = [styles.content, contentStyle];

  return <Animated.View layout={resizeTransition} style={[style, motion]}>
    {nativeGlass ? <GlassView style={[styles.material, shape, content]} isInteractive={interactive}
      colorScheme="dark" glassEffectStyle={{ style: !glass ? 'none' : active ? 'regular' : 'clear', animate: !reduceMotion, animationDuration: 0.25 }}>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, shape, { backgroundColor: restingColor }, solidStyle]} />
      {children}
    </GlassView> : <View style={[styles.material, shape]}>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.fallback, shape, styles.clip,
        active && styles.active, fallbackStyle]}>
        <GlassBackdrop />
        <LinearGradient colors={['rgba(236,244,255,0.12)', 'rgba(91,111,137,0.03)', 'rgba(8,14,23,0.10)']}
          start={{ x: 0, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />
        <LinearGradient colors={['transparent', 'rgba(255,255,255,0.44)', 'transparent']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.rim} />
      </Animated.View>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, shape, { backgroundColor: restingColor }, solidStyle]} />
      <View style={content}>{children}</View>
    </View>}
  </Animated.View>;
}

const styles = StyleSheet.create({
  material: { flex: 1, width: '100%' },
  content: { flex: 1 },
  clip: { overflow: 'hidden' },
  fallback: { backgroundColor: 'rgba(31,43,59,0.08)', borderWidth: 1,
    borderColor: 'rgba(230,241,255,0.24)', borderTopColor: 'rgba(249,252,255,0.44)',
    borderBottomColor: 'rgba(190,209,234,0.12)' },
  active: { borderColor: 'rgba(231,243,255,0.52)' },
  rim: { position: 'absolute', top: 0, left: 12, right: 12, height: 1 },
});
