import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  type Transaction = {
    description: string;
    currency: string;
    state: string;
    amount: string;
    fee: string;
    bookingDate: string;
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTransactions() {
      try {
        const response = await fetch(
          'http://192.168.0.236:8080/api/transactions',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Data can't be loaded"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTransactions();

    return () => controller.abort();
  }, []);

  return (
    <View style={styles.container}>
      { error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.title}>My transactions</Text>
      {!loading && !error && (
        <Text style={styles.subtitle}>
          Completed transactions {transactions.length}
        </Text>
      )}
      { loading && <ActivityIndicator/>}
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        data={transactions}
        keyExtractor={(_, index) => String(index)}
        ListEmptyComponent={
            !loading && !error
              ? <Text style={styles.subtitle}>No transactions yet</Text>
              : null
          }
        renderItem={({item}) => {
          const isOutgoing = item.amount.startsWith('-');

          return (
            <View style={styles.card}>
              <View style={styles.details}>
                <Text style={styles.description} numberOfLines={1}>
                  {item.description || 'No description'}
                </Text>

                <Text style={styles.subtitle}>
                  {item.bookingDate.replace('T', ' ')}
                </Text>

                <Text style={styles.subtitle}>
                  {isOutgoing ? 'Money out' : 'Money in'}
                </Text>
              </View>

              <Text
                style={[
                  styles.amount,
                  !isOutgoing && styles.incomingAmount,
                ]}
              >
                {isOutgoing ? '' : '+'}{item.amount} {item.currency}
              </Text>
            </View>
          )
        }
      }
      />
      <StatusBar style="auto" />
    </View>
  );
}

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
  listContent: {
    paddingTop: 24,
    paddingBottom: 32,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#17212B',
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#17212B',
    fontVariant: ['tabular-nums'],
    flexShrink: 0,
  },
  incomingAmount: {
    color: '#147D50',
  },
  error: {
    color: 'red'
  }
});
