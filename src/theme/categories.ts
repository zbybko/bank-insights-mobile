import type { ComponentProps } from 'react';
import type Ionicons from '@expo/vector-icons/Ionicons';
import type { TransactionCategory } from '../types/transaction';
import { colors } from './theme';

type CategoryStyle = { label: string; icon: ComponentProps<typeof Ionicons>['name']; color: string };

export const categories: Record<TransactionCategory, CategoryStyle> = {
  GROCERIES: { label: 'Groceries', icon: 'basket-outline', color: colors.mint },
  DINING: { label: 'Eating out', icon: 'restaurant-outline', color: '#e7b38e' },
  HOUSING: { label: 'Housing', icon: 'home-outline', color: '#9eb6d0' },
  TRANSPORT: { label: 'Transport', icon: 'car-outline', color: colors.blue },
  SHOPPING: { label: 'Shopping', icon: 'bag-handle-outline', color: colors.violet },
  HEALTH: { label: 'Health', icon: 'medkit-outline', color: '#e6a4b6' },
  ENTERTAINMENT: { label: 'Entertainment', icon: 'play-outline', color: '#b4a6e9' },
  OTHER: { label: 'Other', icon: 'ellipsis-horizontal', color: '#9bb4b8' },
  UNCATEGORIZED: { label: 'Uncategorized', icon: 'help-outline', color: colors.amber },
};
