import { API_BASE_URL } from '../config/api';
import type { Transaction } from '../types/transaction';
import type { MonthlySummary } from '../types/summary';
import { isTransaction, isMonthlySummary } from './validation';

export async function fetchTransactions(signal: AbortSignal): Promise<Transaction[]> {
  const response = await fetch(`${API_BASE_URL}/api/transactions`, { signal });
  if (!response.ok) throw new Error(`Unable to load transactions (${response.status}).`);
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isTransaction)) throw new Error('Unexpected transaction data from server.');
  return data;
}

export async function fetchMonthlySummary(month: string, signal: AbortSignal): Promise<MonthlySummary> {
  const response = await fetch(`${API_BASE_URL}/api/transactions/summary?month=${encodeURIComponent(month)}`, { signal });
  if (!response.ok) throw new Error(`Unable to load monthly summary (${response.status}).`);
  const data: unknown = await response.json();
  if (!isMonthlySummary(data) || data.month !== month) throw new Error('Unexpected monthly summary from server.');
  return data;
}
