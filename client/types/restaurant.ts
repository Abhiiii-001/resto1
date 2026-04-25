export type RestaurantDropdownChoics = {
  id: string;
  name: string;
  resCode: string;
};


export type Restaurant = {
  id: string;
  restaurantId: string;
  email: string;
  isOpen: boolean;
  address: string;
  autoAcceptOrder: boolean;
  isActive: boolean;
  isVerified: boolean;
  name: string;
  number: string;
  resCode: string;
  role: string;
  slogan: string;
  thumnail: string;
  totalEarnings: number;
  totalOrders: number;
  totalQRScan: number;
}