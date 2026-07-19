export const PLAN_TYPE = {
  DEMO: 1,
  PRO: 2,
  PREMIUM: 3,
} as const;

export type PlanType = (typeof PLAN_TYPE)[keyof typeof PLAN_TYPE];

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 1,
  EXPIRED: 2,
  CANCELLED: 3,
  PAST_DUE: 4,
} as const;

export type SubscriptionStatus =
  (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];
