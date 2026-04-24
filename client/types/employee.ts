export type User = {
  id: string;
  email: string;
  name: string;
  number: string;
  canModify?: boolean;
  role: string;
  restaurantId?: string;
  isVerified: boolean;
  thumbnail?: string;
  slogan?: string;
  address?: string;
};

export type AddUpdateUserPayload = {
  id?: string;
  name: string;
  email: string;
  number: string;
  canModify?: boolean;
  role: string;
  restaurantId: string;
  isVerified?: boolean;
};
