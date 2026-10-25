import { BlurView } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';

export function GlassBackdrop() {
  return Platform.OS === 'ios'
    ? <BlurView tint="dark" intensity={18} style={StyleSheet.absoluteFill} />
    : null;
}
