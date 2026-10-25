import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import type { Transaction } from '../types/transaction';
import { categories } from '../theme/categories';
import { colors } from '../theme/theme';
import { formatMoney, dateLabel } from '../utils/format';

export function TransactionCard({ transaction }: { transaction: Transaction }) {
  const outgoing = transaction.amount.startsWith('-');
  const category = categories[transaction.category];
  return <View style={styles.container}>
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: outgoing ? `${category.color}26` : '#78dec326' }]}>
        <Ionicons name={outgoing ? category.icon : 'arrow-down-outline'} size={21} color={outgoing ? category.color : colors.mint} />
      </View>
      <View style={styles.details}>
        <Text style={styles.description} numberOfLines={1}>{transaction.description || 'No description'}</Text>
        <Text style={styles.subtitle}>{dateLabel(transaction.bookingDate)} · {outgoing ? category.label : 'Money in'}</Text>
      </View>
      <Text style={[styles.amount, !outgoing && styles.incoming]}>
        {!outgoing && transaction.amount !== '0.00' ? '+' : ''}{formatMoney(transaction.amount, transaction.currency)}
      </Text>
    </View>
    {transaction.categoryReviewRequired === true && <View style={styles.question}>
      <Ionicons name="help-circle-outline" size={15} color={colors.amber} />
      <Text style={styles.questionText}>{transaction.categoryQuestion || 'This transaction needs a category check.'}</Text>
    </View>}
  </View>;
}
const styles = StyleSheet.create({
  container: { paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: colors.border },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 41, height: 41, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  details: { flex: 1, minWidth: 0 },
  description: { fontSize: 14, fontWeight: '500', color: colors.text },
  subtitle: { fontSize: 11, color: colors.muted, marginTop: 6 },
  amount: { fontSize: 14, fontWeight: '500', color: colors.text, fontVariant: ['tabular-nums'], flexShrink: 0 },
  incoming: { color: colors.mint },
  question: { flexDirection: 'row', gap: 7, marginLeft: 53, marginTop: 11 },
  questionText: { flex: 1, color: colors.amber, fontSize: 11, lineHeight: 17 },
});
