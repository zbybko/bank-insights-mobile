import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFinance } from '../state/FinanceContext';
import { categories } from '../theme/categories';
import { colors } from '../theme/theme';
import { formatMoney } from '../utils/format';
import { GlassCard } from './GlassCard';

export function CategoryBreakdown() {
  const { currencySummary, currency, month } = useFinance();
  const rows = currencySummary?.categories ?? [];
  return <GlassCard>
    <View style={styles.heading}><Text style={styles.title}>Monthly spending</Text><Ionicons name="pie-chart-outline" size={18} color={colors.muted} /></View>
    {rows.length === 0 ? <Text style={styles.empty}>No spending in this month yet.</Text> : rows.map(row => {
      const category = categories[row.category];
      return <Pressable key={row.category} onPress={() => router.push({ pathname: '/category/[category]',
        params: { category: row.category, month, currency } })} style={styles.row} accessibilityRole="button"
        accessibilityLabel={`${category.label}, ${formatMoney(row.amount, currency)}. Open transactions`}>
        <View style={[styles.icon, { backgroundColor: category.color }]}><Ionicons name={category.icon} size={22} color="#1d3548" /></View>
        <View style={styles.detail}>
          <View style={styles.top}><Text style={styles.label}>{category.label}</Text><Text style={styles.amount}>{formatMoney(row.amount, currency)}</Text></View>
          <Text style={styles.sub}>{row.transactionCount} {row.transactionCount === 1 ? 'transaction' : 'transactions'} · {(row.shareBasisPoints / 100).toFixed(0)}% of spending</Text>
          <View style={styles.track}><View style={[styles.fill, { width: `${row.shareBasisPoints / 100}%`, backgroundColor: category.color }]} /></View>
        </View>
        <Ionicons name="chevron-forward" size={15} color={colors.faint} />
      </Pressable>;
    })}
    {rows.length > 0 && <Text style={styles.footnote}>Actual spending · tap a category to explore</Text>}
  </GlassCard>;
}
const styles = StyleSheet.create({
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14 },
  title: { fontSize: 18, fontWeight: '600', color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 19, borderTopWidth: 1, borderTopColor: colors.border },
  icon: { width: 42, height: 42, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  detail: { flex: 1, minWidth: 0 },
  top: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' },
  label: { color: colors.text, fontSize: 14, fontWeight: '500' },
  amount: { color: colors.text, fontSize: 14, fontWeight: '500', fontVariant: ['tabular-nums'] },
  sub: { color: colors.muted, fontSize: 11, marginTop: 7 },
  track: { height: 4, borderRadius: 4, backgroundColor: 'rgba(164,190,217,0.19)', marginTop: 11, overflow: 'hidden' },
  fill: { height: 4, borderRadius: 4 },
  footnote: { color: colors.faint, fontSize: 11, textAlign: 'center', paddingTop: 4 },
  empty: { color: colors.muted, lineHeight: 22, paddingVertical: 18 },
});
