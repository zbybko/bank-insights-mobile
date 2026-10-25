import type { TransactionCategory } from './transaction';

export type CategorySpending = {
  category: TransactionCategory;
  amount: string;
  transactionCount: number;
  shareBasisPoints: number;
};

export type CurrencySummary = {
  currency: string;
  incoming: string;
  outgoing: string;
  net: string;
  fees: string;
  transactionCount: number;
  reviewCount: number;
  categories: CategorySpending[];
};

export type MonthlySummary = { month: string; currencies: CurrencySummary[] };
