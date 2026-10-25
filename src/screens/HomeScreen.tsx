import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { CategoryBreakdown } from '../components/CategoryBreakdown';
import { CurrencySelector, MonthSelector } from '../components/MonthSelector';
import { DataState } from '../components/DataState';
import { GlassCard } from '../components/GlassCard';
import { Screen } from '../components/Screen';
import { useFinance } from '../state/FinanceContext';
import { colors } from '../theme/theme';
import { formatMoney } from '../utils/format';

export function HomeScreen() {
  const { currencySummary: summary, currency, summaryLoading, summaryError, refresh } = useFinance();
  return <Screen>
    <AppHeader />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={summaryLoading} onRefresh={refresh} tintColor={colors.mint} />}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Money in this month</Text>
        <Text style={styles.total} adjustsFontSizeToFit numberOfLines={1}>
          {summaryLoading || summaryError ? '—' : formatMoney(summary?.incoming ?? '0.00', currency)}
        </Text>
        <Text style={styles.heroSub}>Your month. At a glance.</Text>
        <MonthSelector />
        <CurrencySelector />
      </View>
      <DataState loading={summaryLoading} error={summaryError} onRetry={refresh} />
      {!summaryLoading && !summaryError && <>
        <GlassCard>
          <Text style={styles.cardTitle}>Your month, explained</Text>
          <View style={styles.metrics}>
            <View style={styles.metric}>
              <View style={styles.metricLabel}><Ionicons name="arrow-up-outline" size={15} color={colors.muted} /><Text style={styles.caption}>Money out</Text></View>
              <Text style={styles.metricAmount} adjustsFontSizeToFit numberOfLines={1}>{formatMoney(summary?.outgoing ?? '0.00', currency)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.metric}>
              <View style={styles.metricLabel}><Ionicons name="swap-horizontal-outline" size={15} color={colors.mint} /><Text style={styles.caption}>Net flow</Text></View>
              <Text style={[styles.metricAmount, { color: summary?.net.startsWith('-') ? colors.text : colors.mint }]}
                adjustsFontSizeToFit numberOfLines={1}>{formatMoney(summary?.net ?? '0.00', currency)}</Text>
            </View>
          </View>
          <Text style={styles.note}>Completed transactions · {summary?.transactionCount ?? 0} this month</Text>
        </GlassCard>
        {(summary?.reviewCount ?? 0) > 0 && <Pressable accessibilityRole="button"
          onPress={() => router.navigate({ pathname: '/transactions', params: { review: '1', focus: '0', request: String(Date.now()) } })}>
          <GlassCard style={styles.review}>
            <View style={styles.spark}><Ionicons name="sparkles-outline" size={23} color={colors.blue} /></View>
            <View style={styles.reviewCopy}><Text style={styles.reviewTitle}>A little clarity goes a long way</Text>
              <Text style={styles.caption}>{summary!.reviewCount} {summary!.reviewCount === 1 ? 'transaction needs' : 'transactions need'} a category check.</Text></View>
            <Ionicons name="chevron-forward" size={17} color={colors.muted} />
          </GlassCard>
        </Pressable>}
        <CategoryBreakdown />
        <View style={styles.footer}><Ionicons name="shield-checkmark-outline" size={14} color={colors.faint} />
          <Text style={styles.footerText}>Based on imported transactions</Text></View>
        <Text style={styles.disclaimer}>Money in includes all incoming payments. Net flow is not your account balance. Fees are shown separately in Insights.</Text>
      </>}
    </ScrollView>
  </Screen>;
}
const styles = StyleSheet.create({
  content: { paddingHorizontal: 15, paddingBottom: 130, gap: 16 },
  hero: { alignItems: 'center', paddingTop: 25, paddingBottom: 5, gap: 6 },
  eyebrow: { color: colors.muted, fontSize: 15 },
  total: { color: colors.text, fontSize: 47, fontWeight: '600', letterSpacing: -1.8, paddingHorizontal: 10, marginTop: 3 },
  heroSub: { color: colors.muted, fontSize: 14, marginTop: 2, marginBottom: 5 },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '600' },
  metrics: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 22, marginBottom: 18 },
  metric: { flex: 1 },
  metricLabel: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metricAmount: { color: colors.text, fontSize: 23, fontWeight: '500', marginTop: 9, fontVariant: ['tabular-nums'] },
  divider: { width: 1, height: 43, backgroundColor: colors.border },
  caption: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  note: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 13, color: colors.faint, fontSize: 11 },
  review: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  spark: { width: 41, height: 45, alignItems: 'center', justifyContent: 'center' },
  reviewCopy: { flex: 1, gap: 5 },
  reviewTitle: { color: colors.text, fontSize: 14, fontWeight: '500' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 5 },
  footerText: { color: colors.faint, fontSize: 11 },
  disclaimer: { color: colors.faint, fontSize: 11, textAlign: 'center', lineHeight: 17, paddingHorizontal: 12 },
});
