import type { PlanCardData } from '@/components/PlanCard/PlanCard';
import type { Messages } from '@/i18n/types';

export type planGroup = {
  title: keyof Messages['plans']['tabs'];
  isActive?: boolean;
  items: PlanCardData[];
};

export const planGroups: planGroup[] = [
  {
    title: 'monthly',
    isActive: true,
    items: [
      {
        itemKey: 'basic',
        price: {
          value: 9.99,
          currency: 'USD',
          period: 'month',
        },
      },
      {
        itemKey: 'standard',
        price: {
          value: 12.99,
          currency: 'USD',
          period: 'month',
        },
      },
      {
        itemKey: 'premium',
        price: {
          value: 14.99,
          currency: 'USD',
          period: 'month',
        },
      },
    ],
  },
  {
    title: 'yearly',
    items: [
      {
        itemKey: 'basic',
        price: {
          value: 99.99,
          currency: 'USD',
          period: 'year',
        },
      },
      {
        itemKey: 'standard',
        price: {
          value: 129.99,
          currency: 'USD',
          period: 'year',
        },
      },
      {
        itemKey: 'premium',
        price: {
          value: 149.99,
          currency: 'USD',
          period: 'year',
        },
      },
    ],
  },
];
