import { FlatList, StyleSheet, Text } from 'react-native';
import type { Transaction } from '../types/transaction';
import { TransactionCard } from './TransactionCard';

type TransactionListProps = {
  transactions: Transaction[];
  emptyMessage: string;
};

export function TransactionList({
  transactions,
  emptyMessage,
}: TransactionListProps) {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={transactions}
      keyExtractor={(_, index) => String(index)}
      ListEmptyComponent={
        <Text style={styles.empty}>{emptyMessage}</Text>
      }
      renderItem={({ item }) => (
        <TransactionCard transaction={item} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 32,
    gap: 10,
  },
  empty: {
    color: '#687582',
    fontSize: 14,
  },
});