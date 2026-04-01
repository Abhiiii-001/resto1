export type User = {
  id: string;
  email: string;
  name: string;
  number: string;
  canModify: boolean;
  role: string;
  restaurantId: string;
  isVerified: boolean;
};

export type AddUpdateUserPayload = {
  id?: string;
  name: string;
  email: string;
  number: string;
  canModify?: boolean;
  role: string;
  restaurantId: string;
};
