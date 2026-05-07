import { Subscription, Plan } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id?: string;
        email?: string;
        role?: string;
        restaurantId?: string;
        [key: string]: any;
      };
      subscription?: Subscription & { plan: Plan };
    }
  }
}
