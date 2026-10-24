import { useEffect, useState } from 'react';
import { fetchTransactions } from '../api/transactions';
import type { Transaction } from '../types/transaction';

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [attempt, setAttempt] = useState(0);

    function retry() {
        setLoading(true);
        setError(null);
        setAttempt(previous => previous + 1);
    }

    useEffect(() => {
        const controller = new AbortController();
    
        async function loadTransactions() {
          try {
            const data: Transaction[] = await fetchTransactions(controller.signal);

            if (!controller.signal.aborted) {
                setTransactions(data);
            }
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
      }, [attempt]);

    return { transactions, loading, error, retry };
}
