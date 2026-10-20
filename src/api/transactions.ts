import { API_BASE_URL } from '../config/api';
import type { Transaction } from '../types/transaction';

export async function fetchTransactions(
  signal: AbortSignal
): Promise<Transaction[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/transactions`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isTransaction)) {
    throw new Error('Unexpected response from server');
  }

  return data;
}

function isTransaction(value: unknown): value is Transaction {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const transaction = value as Record<string, unknown>;
  return (
    typeof transaction.description === 'string' &&
    typeof transaction.currency === 'string' &&
    typeof transaction.state === 'string' &&
    typeof transaction.amount === 'string' &&
    typeof transaction.fee === 'string' &&
    typeof transaction.bookingDate === 'string'
  );
}