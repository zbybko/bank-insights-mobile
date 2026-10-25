import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { GlassSurface } from '../ui/liquid-glass';
import { colors } from '../theme/theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
};
export function TransactionSearch({ value, onChangeText, onFocus, autoFocus, placeholder = 'Search transactions…' }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <GlassSurface style={styles.shell} contentStyle={styles.content} active={focused} interactive>
      <Ionicons name="search-outline" size={18} color={focused ? colors.text : colors.muted} />
      <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={colors.muted}
        accessibilityLabel={placeholder} value={value} onChangeText={onChangeText}
        onFocus={() => { setFocused(true); onFocus?.(); }} onBlur={() => setFocused(false)}
        autoFocus={autoFocus} autoCapitalize="none" autoCorrect={false} returnKeyType="search" selectionColor={colors.mint} />
      {value.length > 0 && <Pressable onPress={() => onChangeText('')} accessibilityRole="button"
        accessibilityLabel="Clear search" hitSlop={8} style={styles.clear}><Ionicons name="close-circle" size={18} color={colors.muted} /></Pressable>}
    </GlassSurface>
  );
}
const styles = StyleSheet.create({
  shell: { flex: 1, minWidth: 0, height: 44 },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 13 },
  input: { flex: 1, color: colors.text, fontSize: 14, minWidth: 0, paddingVertical: 0, height: '100%', outlineWidth: 0 },
  clear: { minWidth: 24, height: 40, alignItems: 'center', justifyContent: 'center' },
});
