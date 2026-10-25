import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../theme/theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
};
export function TransactionSearch({ value, onChangeText, onFocus, autoFocus, placeholder = 'Search transactions…' }: Props) {
  return (
    <View style={styles.shell}>
      {Platform.OS === 'ios' && <BlurView tint="dark" intensity={22} style={StyleSheet.absoluteFill} />}
      <Ionicons name="search-outline" size={19} color={colors.muted} />
      <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={colors.muted}
        accessibilityLabel={placeholder} value={value} onChangeText={onChangeText} onFocus={onFocus}
        autoFocus={autoFocus} autoCapitalize="none" autoCorrect={false} returnKeyType="search" selectionColor={colors.mint} />
      {value.length > 0 && <Pressable onPress={() => onChangeText('')} accessibilityRole="button"
        accessibilityLabel="Clear search" hitSlop={8}><Ionicons name="close-circle" size={18} color={colors.muted} /></Pressable>}
    </View>
  );
}
const styles = StyleSheet.create({
  shell: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 9, minHeight: 46,
    borderRadius: 26, paddingHorizontal: 14, overflow: 'hidden', backgroundColor: 'rgba(92,121,154,0.14)',
    borderWidth: 1, borderColor: 'rgba(229,241,255,0.28)', borderTopColor: 'rgba(242,248,255,0.43)' },
  input: { flex: 1, color: colors.text, fontSize: 14, minWidth: 0, paddingVertical: 12, outlineWidth: 0 },
});
