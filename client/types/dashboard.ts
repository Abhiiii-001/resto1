export type Product = {
  name: string;
  thumbnail: string;
};

export type Products = {
  id: string;
  isOutOfStock: boolean;
  price: number;
  size: string;
  salePrice?: number | null;
  sold: number;
  productId: string;
  product: Product;
};
export type Summary = {
  id: string;
  amount: number;
  duration: string;
  orders: number;
  restaurantId: string;
  createdAt: string;
};
export type SalesSummary = {
  day: Summary[];
  month: Summary[];
};

export type StatsSummary = {
  totalEarning: number;
  totalOrders: number;
  totalQRScan: number;
};

export type OrderStatusSummary = {
  data: number[];
  label: string[];
};

export type DashboardData = {
  products: Products[];
  saleSummary: SalesSummary;
  stats: StatsSummary;
  status: OrderStatusSummary;
};
