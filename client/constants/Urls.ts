export const BASE_API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL + "/api";
export const RESTAURANT_BASE_URL =
  process.env.NEXT_PUBLIC_RESTAURANT_BASE_URL || 'http://localhost:3000';

export const API_URLS = {
  auth: BASE_API_URL + '/auth',
  restaurant: BASE_API_URL + '/restaurant',
  category: BASE_API_URL + '/category',
  product: BASE_API_URL + '/product',
  order: BASE_API_URL + '/order',
  dashboard: BASE_API_URL + '/dashboard',
  user: BASE_API_URL + '/user',
  contact: BASE_API_URL + '/contact',
  subscription: BASE_API_URL + '/subscription'
};
