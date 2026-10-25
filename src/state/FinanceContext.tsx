import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { fetchMonthlySummary } from '../api/transactions';
import type { MonthlySummary } from '../types/summary';
import { currentMonth } from '../utils/format';

function useFinanceState() {
  const transactionState = useTransactions();
  const [month, setMonth] = useState(currentMonth);
  const [currency, setCurrency] = useState('EUR');
  const [attempt, setAttempt] = useState(0);
  const [summaryState, setSummaryState] = useState<{
    month: string; attempt: number; data: MonthlySummary | null; loading: boolean; error: string | null;
  }>({ month, attempt, data: null, loading: true, error: null });
  useEffect(() => {
    const controller = new AbortController();
    fetchMonthlySummary(month, controller.signal)
      .then(data => {
        if (controller.signal.aborted) return;
        setSummaryState({ month, attempt, data, loading: false, error: null });
        setCurrency(previous => data.currencies.some(item => item.currency === previous)
          ? previous : data.currencies[0]?.currency ?? previous);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setSummaryState({ month, attempt, data: null, loading: false,
          error: error instanceof Error ? error.message : 'Unable to load your month.' });
      });
    return () => controller.abort();
  }, [month, attempt]);

  const current = summaryState.month === month && summaryState.attempt === attempt;
  const summary = current ? summaryState.data : null;
  return {
    ...transactionState, month, setMonth, currency, setCurrency, summary,
    currencySummary: summary?.currencies.find(item => item.currency === currency) ?? null,
    summaryLoading: !current || summaryState.loading,
    summaryError: current ? summaryState.error : null,
    refresh() { transactionState.retry(); setAttempt(previous => previous + 1); },
  };
}

const FinanceContext = createContext<ReturnType<typeof useFinanceState> | null>(null);
export function FinanceProvider({ children }: { children: ReactNode }) {
  return <FinanceContext.Provider value={useFinanceState()}>{children}</FinanceContext.Provider>;
}
export function useFinance() {
  const value = useContext(FinanceContext);
  if (!value) throw new Error('FinanceProvider is missing.');
  return value;
}
