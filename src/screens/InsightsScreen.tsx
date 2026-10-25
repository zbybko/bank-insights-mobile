import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { CategoryBreakdown } from '../components/CategoryBreakdown';
import { DataState } from '../components/DataState';
import { GlassCard } from '../components/GlassCard';
import { CurrencySelector, MonthSelector } from '../components/MonthSelector';
import { Screen } from '../components/Screen';
import { useFinance } from '../state/FinanceContext';
import { colors } from '../theme/theme';
import { formatMoney } from '../utils/format';

export function InsightsScreen() {
  const { currencySummary: summary, currency, summaryLoading, summaryError, refresh } = useFinance();
  return <Screen><AppHeader />
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.eyebrow}>THE BIGGER PICTURE</Text><Text style={styles.title}>Insights</Text>
      <MonthSelector /><CurrencySelector />
      <DataState loading={summaryLoading} error={summaryError} onRetry={refresh} />
      {!summaryLoading && !summaryError && <>
        <GlassCard><Text style={styles.cardTitle}>Your month, explained</Text>
          <Text style={styles.total}>{formatMoney(summary?.net ?? '0.00', currency)}</Text><Text style={styles.subtitle}>Net flow from completed transactions</Text>
          {[
            ['Money in', summary?.incoming ?? '0.00', colors.mint],
            ['Money out', summary?.outgoing ?? '0.00', colors.text],
            ['Recorded fees', summary?.fees ?? '0.00', colors.muted],
          ].map(([label, amount, color]) => <View key={label} style={styles.row}><Text style={styles.subtitle}>{label}</Text>
            <Text style={[styles.value, { color }]}>{formatMoney(amount, currency)}</Text></View>)}
        </GlassCard>
        <CategoryBreakdown />
        <Text style={styles.note}>Money in includes refunds and transfers. Fees are displayed separately and are not subtracted again from net flow.</Text>
      </>}
    </ScrollView>
  </Screen>;
}
const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 130, gap: 14 },
  eyebrow: { color: colors.faint, fontSize: 10, letterSpacing: 2 },
  title: { color: colors.text, fontSize: 30, fontWeight: '600', letterSpacing: -0.8 },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '600' },
  total: { color: colors.text, fontSize: 37, fontWeight: '600', marginTop: 20, marginBottom: 6, letterSpacing: -1 },
  subtitle: { color: colors.muted, fontSize: 12, lineHeight: 19 },
  row: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 17, marginTop: 17 },
  value: { fontSize: 15, fontWeight: '500', fontVariant: ['tabular-nums'] },
  note: { color: colors.faint, fontSize: 11, lineHeight: 18, textAlign: 'center', paddingHorizontal: 10 },
});
