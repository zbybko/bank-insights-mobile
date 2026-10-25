import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TransactionSearch } from './TransactionSearch';
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
    {back ? <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={styles.circle}
      accessibilityRole="button" accessibilityLabel="Go back"><Ionicons name="chevron-back" size={21} color={colors.text} /></Pressable>
      : <View style={[styles.circle, styles.avatar]}><Text style={styles.initials}>BI</Text></View>}
    <TransactionSearch value={search ?? draft} onChangeText={searchChanged} autoFocus={autoFocus}
      onFocus={onSearch ? undefined : () => router.navigate({ pathname: '/transactions', params: { focus: '1', search: '', review: '0', request: String(Date.now()) } })} />
    <Pressable onPress={() => router.navigate('/insights')} style={styles.circle} accessibilityRole="button"
      accessibilityLabel="Open monthly insights"><Ionicons name="sparkles-outline" size={22} color={colors.text} /></Pressable>
  </View>;
}
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 18, paddingTop: 9, paddingBottom: 12 },
  circle: { width: 43, height: 43, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(229,241,255,0.25)', backgroundColor: 'rgba(104,139,174,0.12)' },
  avatar: { borderColor: '#91b7b9', borderWidth: 1.5 },
  initials: { fontSize: 13, color: colors.text, letterSpacing: 0.5 },
});
