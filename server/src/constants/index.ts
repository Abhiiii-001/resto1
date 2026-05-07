export const PLAN_TYPE = {
  DEMO: 1,
  PRO: 2,
  PREMIUM: 3,
} as const;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 1,
  EXPIRED: 2,
  CANCELLED: 3,
  PAST_DUE: 4,
} as const;

export const PAYMENT_TYPE = {
  SUBSCRIPTION: 1,
  ORDER: 2,
} as const;

export const PAYMENT_STATUS = {
  PENDING: 1,
  CAPTURED: 2,
  FAILED: 3,
  REFUNDED: 4,
} as const;

// Reverse mappings for easy lookup if needed (e.g., getting string name from int)
export const PLAN_TYPE_MAP = Object.fromEntries(
  Object.entries(PLAN_TYPE).map(([key, value]) => [value, key])
);

export const SUBSCRIPTION_STATUS_MAP = Object.fromEntries(
  Object.entries(SUBSCRIPTION_STATUS).map(([key, value]) => [value, key])
);

export const PAYMENT_TYPE_MAP = Object.fromEntries(
  Object.entries(PAYMENT_TYPE).map(([key, value]) => [value, key])
);

export const PAYMENT_STATUS_MAP = Object.fromEntries(
  Object.entries(PAYMENT_STATUS).map(([key, value]) => [value, key])
);
