import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFinance } from '../state/FinanceContext';
import { colors } from '../theme/theme';
import { currentMonth, monthLabel, shiftMonth } from '../utils/format';

export function MonthSelector() {
  const { month, setMonth } = useFinance();
  const isCurrent = month === currentMonth();
  return <View style={styles.month}>
    <Pressable onPress={() => setMonth(shiftMonth(month, -1))} accessibilityRole="button"
      accessibilityLabel="Previous month" hitSlop={8} style={styles.arrow}>
      <Ionicons name="chevron-back" size={18} color={colors.muted} />
    </Pressable>
    <Pressable onPress={() => setMonth(currentMonth())} accessibilityRole="button"
      accessibilityLabel={`${monthLabel(month)}. Return to current month`} style={styles.label}>
      <Text style={styles.text}>{monthLabel(month)}</Text>
    </Pressable>
    <Pressable onPress={() => setMonth(shiftMonth(month, 1))} disabled={isCurrent} accessibilityRole="button"
      accessibilityLabel="Next month" accessibilityState={{ disabled: isCurrent }} hitSlop={8} style={styles.arrow}>
      <Ionicons name="chevron-forward" size={18} color={isCurrent ? '#52677d' : colors.muted} />
    </Pressable>
  </View>;
}
export function CurrencySelector() {
  const { summary, currency, setCurrency } = useFinance();
  if (!summary || summary.currencies.length < 2) return null;
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.currencies}>
    {summary.currencies.map(item => <Pressable key={item.currency} onPress={() => setCurrency(item.currency)}
      accessibilityRole="button" accessibilityState={{ selected: currency === item.currency }}
      style={[styles.chip, currency === item.currency && styles.selected]}>
      <Text style={styles.text}>{item.currency}</Text>
    </Pressable>)}
  </ScrollView>;
}
const styles = StyleSheet.create({
  month: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', backgroundColor: 'rgba(148,178,210,0.13)',
    borderRadius: 25, borderWidth: 1, borderColor: colors.border, marginVertical: 10 },
  arrow: { width: 44, height: 42, alignItems: 'center', justifyContent: 'center' },
  label: { paddingHorizontal: 8, minWidth: 140, alignItems: 'center' },
  text: { color: colors.text, fontSize: 13, fontWeight: '500' },
  currencies: { flexGrow: 1, justifyContent: 'center', gap: 8, paddingBottom: 14 },
  chip: { paddingHorizontal: 17, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
  selected: { backgroundColor: 'rgba(120,222,195,0.18)', borderColor: '#78dec377' },
});
