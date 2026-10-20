import { StyleSheet, Text, View } from 'react-native';
import type { Transaction } from '../types/transaction';

type TransactionCardProps = {
    transaction: Transaction;
};

export function TransactionCard({
    transaction,
}: TransactionCardProps) {
    const isOutgoing = transaction.amount.startsWith('-');

    return (
        <View style={styles.card}>
            <View style={styles.details}>
                <Text style={styles.description} numberOfLines={1}>
                    {transaction.description || 'No description'}
                </Text>

                <Text style={styles.subtitle}>
                    {transaction.bookingDate.replace('T', ' ')}
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
                {isOutgoing ? '' : '+'}{transaction.amount} {transaction.currency}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 13,
    color: '#687582',
    marginTop: 4,
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
});
