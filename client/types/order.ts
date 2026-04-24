export type OrderItem = {
  id: string;
  name: string;
  variant: string;
  productVariantId: string;
  quantity: number;
  unitPrice: number;
  orderId: string;
};

export type Order = {
  id: string;
  orderCode: string;
  name: string;
  note?: string;
  amount: number;
  status: string;
  isPack: boolean;
  isVerified: boolean;
  invoice: string;
  paymentOption: string;
  createdAt: string;
  restaurantId: string;
  orders: OrderItem[];
};

// Types for creating order
export type CreateOrderItem = {
  name: string;
  variant: string;
  productVariantId: string;
  quantity: number;
  unitPrice: number;
};
export type CreateOrderPayload = {
  name: string;
  note?: string;
  amount: number;
  isPack: boolean;
  status: string;
  paymentOption: string;
  restaurantId: string;
  orders: CreateOrderItem[];
};

export type UpdateOrderPayload = {
  id: string;
  data: Partial<CreateOrderPayload>;
};
