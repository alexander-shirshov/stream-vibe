import type { PlanCardData } from '@/components/PlanCard/PlanCard';
import type { Messages } from '@/i18n/types';

export type PlanKey = keyof Messages['plans']['items'];
export type BillingPeriod = keyof Messages['plans']['tabs'];
export type PlanPrice = PlanCardData['price'];

export type SubscriptionPlan = {
  itemKey: PlanKey;
  isPopular: boolean;
  prices: Record<BillingPeriod, PlanPrice>;
};

export type PlanGroup = {
  title: BillingPeriod;
  isActive?: boolean;
  items: PlanCardData[];
};

export const subscriptionPlans = [
  {
    itemKey: 'basic',
    isPopular: false,
    prices: {
      monthly: {
        value: 9.99,
        currency: 'USD',
        period: 'month',
      },
      yearly: {
        value: 99.99,
        currency: 'USD',
        period: 'year',
      },
    },
  },
  {
    itemKey: 'standard',
    isPopular: true,
    prices: {
      monthly: {
        value: 12.99,
        currency: 'USD',
        period: 'month',
      },
      yearly: {
        value: 129.99,
        currency: 'USD',
        period: 'year',
      },
    },
  },
  {
    itemKey: 'premium',
    isPopular: false,
    prices: {
      monthly: {
        value: 14.99,
        currency: 'USD',
        period: 'month',
      },
      yearly: {
        value: 149.99,
        currency: 'USD',
        period: 'year',
      },
    },
  },
] as const satisfies readonly SubscriptionPlan[];

export const billingPeriods = [
  {
    title: 'monthly',
    isActive: true,
  },
  {
    title: 'yearly',
    isActive: false,
  },
] as const satisfies readonly Pick<PlanGroup, 'title' | 'isActive'>[];

export const planGroups: PlanGroup[] = billingPeriods.map(period => ({
  title: period.title,
  isActive: period.isActive,
  items: subscriptionPlans.map(plan => ({
    itemKey: plan.itemKey,
    price: plan.prices[period.title],
  })),
}));

export type PlanComparisonFeatureKey =
  keyof Messages['subscriptionsPage']['comparison']['features'];

export type PlanComparisonValueKey = keyof Messages['subscriptionsPage']['comparison']['values'];

export type PlanComparisonRow =
  | {
      featureKey: 'price';
      type: 'price';
    }
  | {
      featureKey: Exclude<PlanComparisonFeatureKey, 'price'>;
      type: 'text';
      values: Record<PlanKey, PlanComparisonValueKey>;
    };

export const planComparisonRows = [
  {
    featureKey: 'price',
    type: 'price',
  },
  {
    featureKey: 'content',
    type: 'text',
    values: {
      basic: 'basicContent',
      standard: 'standardContent',
      premium: 'premiumContent',
    },
  },
  {
    featureKey: 'devices',
    type: 'text',
    values: {
      basic: 'oneDevice',
      standard: 'twoDevices',
      premium: 'fourDevices',
    },
  },
  {
    featureKey: 'freeTrial',
    type: 'text',
    values: {
      basic: 'sevenDays',
      standard: 'sevenDays',
      premium: 'sevenDays',
    },
  },
  {
    featureKey: 'cancelAnytime',
    type: 'text',
    values: {
      basic: 'yes',
      standard: 'yes',
      premium: 'yes',
    },
  },
  {
    featureKey: 'hdr',
    type: 'text',
    values: {
      basic: 'no',
      standard: 'yes',
      premium: 'yes',
    },
  },
  {
    featureKey: 'dolbyAtmos',
    type: 'text',
    values: {
      basic: 'no',
      standard: 'yes',
      premium: 'yes',
    },
  },
  {
    featureKey: 'adFree',
    type: 'text',
    values: {
      basic: 'no',
      standard: 'yes',
      premium: 'yes',
    },
  },
  {
    featureKey: 'offlineViewing',
    type: 'text',
    values: {
      basic: 'no',
      standard: 'selectTitles',
      premium: 'allTitles',
    },
  },
  {
    featureKey: 'familySharing',
    type: 'text',
    values: {
      basic: 'no',
      standard: 'fiveMembers',
      premium: 'sixMembers',
    },
  },
] as const satisfies readonly PlanComparisonRow[];
