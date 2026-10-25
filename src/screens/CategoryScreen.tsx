import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { isCategory } from '../api/validation';
import { AppHeader } from '../components/AppHeader';
import { DataState } from '../components/DataState';
import { CurrencySelector, MonthSelector } from '../components/MonthSelector';
import { Screen } from '../components/Screen';
import { TransactionList } from '../components/TransactionList';
import { useFinance } from '../state/FinanceContext';
import { categories } from '../theme/categories';
import { colors } from '../theme/theme';
import { formatMoney } from '../utils/format';

export function CategoryScreen() {
  const params = useLocalSearchParams<{ category: string; month?: string; currency?: string }>();
  const { transactions, loading, error, month, setMonth, currency, setCurrency, currencySummary, summaryLoading, summaryError, refresh } = useFinance();
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (typeof params.month === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(params.month)) setMonth(params.month);
    if (typeof params.currency === 'string' && /^[A-Z]{3}$/.test(params.currency)) setCurrency(params.currency);
  }, [params.month, params.currency, setMonth, setCurrency]);
  if (!isCategory(params.category)) return <Screen><AppHeader back /><Text style={styles.title}>Category not found</Text></Screen>;
  const category = categories[params.category];
  const row = currencySummary?.categories.find(item => item.category === params.category);
  const filtered = transactions.filter(t => t.bookingDate.startsWith(month) && t.currency === currency
    && t.state === 'COMPLETED' && t.amount.startsWith('-') && t.category === params.category
    && t.description.toLowerCase().includes(search.trim().toLowerCase()));
  return <Screen>
    <AppHeader back search={search} onSearch={setSearch} />
    <View style={styles.hero}>
      <View style={[styles.icon, { backgroundColor: category.color }]}><Ionicons name={category.icon} size={26} color="#1d3548" /></View>
      <Text style={styles.title}>{category.label}</Text>
      <Text style={styles.amount}>{summaryLoading || summaryError ? '—' : formatMoney(row?.amount ?? '0.00', currency)}</Text>
      <Text style={styles.subtitle}>Spent this month · {row?.transactionCount ?? 0} transactions</Text>
    </View>
    <MonthSelector /><CurrencySelector />
    <DataState loading={loading} error={error ?? summaryError} onRetry={refresh} />
    {!loading && !error && <TransactionList transactions={filtered} onRefresh={refresh}
      emptyMessage={search ? 'No transactions match your search.' : 'No spending in this category for this month.'} />}
  </Screen>;
}
const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingTop: 22, gap: 10 },
  icon: { width: 56, height: 56, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  title: { color: colors.text, fontSize: 24, fontWeight: '600' },
  amount: { color: colors.text, fontSize: 37, fontWeight: '600', fontVariant: ['tabular-nums'], letterSpacing: -1 },
  subtitle: { color: colors.muted, fontSize: 12, marginBottom: 5 },
});
