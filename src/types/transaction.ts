export type TransactionCategory =
  | 'GROCERIES'
  | 'DINING'
  | 'HOUSING'
  | 'TRANSPORT'
  | 'SHOPPING'
  | 'HEALTH'
  | 'ENTERTAINMENT'
  | 'OTHER'
  | 'UNCATEGORIZED';

export type CategorySource =
  | 'UNCLASSIFIED'
  | 'RULE'
  | 'AI'
  | 'USER';

export type Transaction = {
  id: string;
  description: string;
  currency: string;
  state: string;
  amount: string;
  fee: string;
  bookingDate: string;

  category: TransactionCategory;
  categorySource: CategorySource;
  suggestedCategory: TransactionCategory | null;
  categoryExplanation: string | null;
  categoryReviewRequired: boolean | null;
  categoryQuestion: string | null;
  categorizedAt: string | null;
};