import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TransactionSearch } from './TransactionSearch';
import { GlassButton, GlassSurface } from '../ui/liquid-glass';
import { colors } from '../theme/theme';

type Props = { search?: string; onSearch?: (value: string) => void; back?: boolean; autoFocus?: boolean };
export function AppHeader({ search, onSearch, back = false, autoFocus }: Props) {
  const [draft, setDraft] = useState('');
  function searchChanged(value: string) {
    if (onSearch) onSearch(value);
    else {
      setDraft(value);

    }
  }
  return <View style={styles.header}>
    {back ? <GlassButton onPress={() => router.canGoBack() ? router.back() : router.replace('/')}
      accessibilityLabel="Go back"><Ionicons name="chevron-back" size={20} color={colors.text} /></GlassButton>
      : <GlassSurface style={styles.avatar} contentStyle={styles.center}><Text style={styles.initials}>BI</Text></GlassSurface>}
    <TransactionSearch value={search ?? draft} onChangeText={searchChanged} autoFocus={autoFocus}
      onFocus={onSearch ? undefined : () => router.navigate({ pathname: '/transactions', params: { focus: '1', search: '', review: '0', request: String(Date.now()) } })} />
    <GlassButton onPress={() => router.navigate('/insights')} accessibilityLabel="Open monthly insights">
      <Ionicons name="sparkles-outline" size={20} color={colors.text} /></GlassButton>
  </View>;
}
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14 },
  avatar: { width: 44, height: 44, flexShrink: 0 },
  center: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontSize: 12, fontWeight: '600', color: colors.text, letterSpacing: 0.7 },
});
