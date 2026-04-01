export interface RestaturantSignupInterface {
  name: string;
  slogan?: string;
  thumbnail: File;
  number: string;
  address: string;
  email: string;
  password: string;
}

export interface UserSignupInterface {
  name?: string;
  number: number;
  email: string;
  password: string;
  restaurantId: number;
}
