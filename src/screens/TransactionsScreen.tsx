import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTransactions } from '../hooks/useTransactions';
import { TransactionList } from '../components/TransactionList';
import { TransactionSearch } from '../components/TransactionSearch';

export function TransactionsScreen() {
  const { transactions, loading, error, retry } = useTransactions();
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(query)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My transactions</Text>

      {!loading && !error && (
        <Text style={styles.subtitle}>
          Showing {filteredTransactions.length} of {transactions.length}
        </Text>
      )}

      <TransactionSearch
        value={search}
        onChangeText={setSearch}
      />

      {loading && <ActivityIndicator />}
      {error && (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={retry}
            style={styles.retryButton}
            disabled={loading}
          >
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && (
        <TransactionList
          transactions={filteredTransactions}
          emptyMessage={
            query ? 'No matching transactions' : 'No transactions yet'
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F7',
    paddingHorizontal: 20,
    paddingTop: 64,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#17212B',
  },
  subtitle: {
    fontSize: 13,
    color: '#687582',
    marginTop: 4,
  },
  error: {
    color: '#B42318',
    marginTop: 16,
  },
  retryButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 8,
  },
  retryText: {
    color: '#1769AA',
    fontSize: 15,
    fontWeight: '600',
  }
});