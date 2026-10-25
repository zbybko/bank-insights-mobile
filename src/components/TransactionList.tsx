import type { ReactElement } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import type { Transaction } from '../types/transaction';
import { TransactionCard } from './TransactionCard';
import { colors } from '../theme/theme';

type Props = {
  transactions: Transaction[];
  emptyMessage: string;
  header?: ReactElement;
  refreshing?: boolean;
  onRefresh?: () => void;
};
export function TransactionList({ transactions, emptyMessage, header, refreshing = false, onRefresh }: Props) {
  return <FlatList style={styles.list} contentContainerStyle={styles.content} data={transactions}
    keyExtractor={item => item.id} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
    ListHeaderComponent={header}
    refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.mint} /> : undefined}
    ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>Nothing here yet</Text><Text style={styles.emptyText}>{emptyMessage}</Text></View>}
    renderItem={({ item }) => <TransactionCard transaction={item} />} />;
}
const styles = StyleSheet.create({
  list: { flex: 1 },
  content: { paddingHorizontal: 22, paddingBottom: 130 },
  empty: { alignItems: 'center', paddingVertical: 45, gap: 10 },
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '500' },
  emptyText: { color: colors.muted, fontSize: 13, lineHeight: 20, textAlign: 'center' },
});
