import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { DataState } from '../components/DataState';
import { CurrencySelector, MonthSelector } from '../components/MonthSelector';
import { Screen } from '../components/Screen';
import { TransactionList } from '../components/TransactionList';
import { useFinance } from '../state/FinanceContext';
import { colors } from '../theme/theme';

export function TransactionsScreen() {
  const params = useLocalSearchParams<{ search?: string; review?: string; focus?: string; request?: string }>();
  return <TransactionsContent key={params.request ?? 'activity'} initialSearch={params.search ?? ''}
    initialReview={params.review === '1'} autoFocus={params.focus === '1'} />;
}

function TransactionsContent({ initialSearch, initialReview, autoFocus }: {
  initialSearch: string; initialReview: boolean; autoFocus: boolean;
}) {
  const [search, setSearch] = useState(initialSearch);
  const [reviewOnly, setReviewOnly] = useState(initialReview);
  const { transactions, loading, error, refresh, month, currency } = useFinance();
  const query = search.trim().toLowerCase();
  const filtered = transactions.filter(t => t.state === 'COMPLETED' && t.bookingDate.startsWith(month)
    && t.currency === currency && (!reviewOnly || t.categoryReviewRequired === true)
    && t.description.toLowerCase().includes(query));
  return <Screen>
    <AppHeader search={search} onSearch={setSearch} autoFocus={autoFocus} />
    <View style={styles.heading}><Text style={styles.eyebrow}>YOUR ACTIVITY</Text><Text style={styles.title}>Transactions</Text></View>
    <MonthSelector /><CurrencySelector />
    <View style={styles.filters}>{[false, true].map(review => <Pressable key={String(review)}
      onPress={() => setReviewOnly(review)} accessibilityRole="button" accessibilityState={{ selected: reviewOnly === review }}
      style={[styles.chip, reviewOnly === review && styles.selected]}><Text style={[styles.chipText, reviewOnly === review && styles.selectedText]}>
        {review ? 'Needs review' : 'All transactions'}</Text></Pressable>)}</View>
    <DataState loading={loading} error={error} onRetry={refresh} />
    {!loading && !error && <TransactionList transactions={filtered} onRefresh={refresh} refreshing={loading}
      header={<Text style={styles.count}>{filtered.length} {filtered.length === 1 ? 'transaction' : 'transactions'} · {currency}</Text>}
      emptyMessage={query ? 'Try a different search or month.' : 'No transactions match this month and filter.'} />}
  </Screen>;
}
const styles = StyleSheet.create({
  heading: { paddingHorizontal: 23, paddingTop: 16, gap: 8 },
  eyebrow: { color: colors.faint, fontSize: 10, letterSpacing: 2 },
  title: { color: colors.text, fontSize: 30, fontWeight: '600', letterSpacing: -0.8 },
  filters: { flexDirection: 'row', gap: 8, paddingHorizontal: 23, paddingTop: 9, paddingBottom: 15 },
  chip: { borderRadius: 22, paddingHorizontal: 15, paddingVertical: 10, borderWidth: 1, borderColor: colors.border },
  selected: { backgroundColor: 'rgba(163,193,224,0.18)', borderColor: 'rgba(200,224,248,0.26)' },
  chipText: { color: colors.muted, fontSize: 12 },
  selectedText: { color: colors.text },
  count: { color: colors.faint, fontSize: 11, paddingTop: 6, paddingBottom: 6 },
});
