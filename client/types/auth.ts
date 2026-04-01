export type UserSignupPayload = {
  name: string;
  email: string;
  password: string;
  number: string;
  restaurantId: string;
};

export type RestaurantSignupPayload = {
  name: string;
  slogan: string;
  email: string;
  password: string;
  confirmPassword?: string;
  thumbnail: File;
  number: string;
  address: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type VerifyTokenPayload = {
  token: string;
};

export type ChangePasswordPayload = {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  role: string;
};

export type ResetPasswordPayload = {
  email: string;
};

export type ResetPasswordMakerPayload = {
  password: string;
  verificationToken: string;
};
