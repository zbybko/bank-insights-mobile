import { StyleSheet, View, type ViewStyle } from 'react-native';

// Isolate browser-only CSS and blur behind the content, never on text or icons.
const backdrop: ViewStyle & { backdropFilter: string; WebkitBackdropFilter: string } = {
  ...StyleSheet.absoluteFill,
  backdropFilter: 'blur(14px) saturate(145%)',
  WebkitBackdropFilter: 'blur(14px) saturate(145%)',
};

export function GlassBackdrop() {
  return <View style={backdrop} />;
}
