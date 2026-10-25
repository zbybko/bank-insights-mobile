import type { Transaction, CategorySource, TransactionCategory } from '../types/transaction';
import type { MonthlySummary, CurrencySummary, CategorySpending } from '../types/summary';

const categoryNames: readonly string[] = ['GROCERIES', 'DINING', 'HOUSING', 'TRANSPORT', 'SHOPPING', 'HEALTH', 'ENTERTAINMENT', 'OTHER', 'UNCATEGORIZED'];
const sources: readonly string[] = ['UNCLASSIFIED', 'RULE', 'AI', 'USER'];
export const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;
export const isMoney = (v: unknown): v is string => typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v);
export const isCategory = (v: unknown): v is TransactionCategory => typeof v === 'string' && categoryNames.includes(v);
const isSource = (v: unknown): v is CategorySource => typeof v === 'string' && sources.includes(v);
const nullableString = (v: unknown) => v === null || typeof v === 'string';
const isCount = (v: unknown): v is number => typeof v === 'number' && Number.isSafeInteger(v) && v >= 0;

export function isTransaction(v: unknown): v is Transaction {
  return isObject(v) && typeof v.id === 'string' && typeof v.description === 'string'
    && typeof v.currency === 'string' && typeof v.state === 'string'
    && isMoney(v.amount) && isMoney(v.fee)
    && typeof v.bookingDate === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v.bookingDate)
    && isCategory(v.category) && isSource(v.categorySource)
    && (v.suggestedCategory === null || isCategory(v.suggestedCategory))
    && nullableString(v.categoryExplanation) && nullableString(v.categoryQuestion)
    && nullableString(v.categorizedAt)
    && (v.categoryReviewRequired === null || typeof v.categoryReviewRequired === 'boolean');
}

function isCategorySpending(v: unknown): v is CategorySpending {
  return isObject(v) && isCategory(v.category) && isMoney(v.amount) && !v.amount.startsWith('-')
    && isCount(v.transactionCount) && isCount(v.shareBasisPoints) && v.shareBasisPoints <= 10000;
}
function isCurrencySummary(v: unknown): v is CurrencySummary {
  return isObject(v) && typeof v.currency === 'string' && /^[A-Z]{3}$/.test(v.currency)
    && isMoney(v.incoming) && isMoney(v.outgoing) && isMoney(v.net) && isMoney(v.fees)
    && isCount(v.transactionCount) && isCount(v.reviewCount)
    && Array.isArray(v.categories) && v.categories.every(isCategorySpending);
}
export function isMonthlySummary(v: unknown): v is MonthlySummary {
  return isObject(v) && typeof v.month === 'string' && /^\d{4}-\d{2}$/.test(v.month)
    && Array.isArray(v.currencies) && v.currencies.every(isCurrencySummary);
}
