import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkLimit = (resource: 'products' | 'categories' | 'employees') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const plan = req.subscription?.plan;
      if (!plan) {
         return res.status(500).json({ success: false, message: "Subscription not found in request." });
      }

      // capitalize resource name
      const capResource = resource.charAt(0).toUpperCase() + resource.slice(1);
      const limit = plan[`max${capResource}` as keyof typeof plan] as number;
      
      if (limit === -1) return next(); // Unlimited
      
      const restaurantId = req.user?.restaurantId || req.user?.id;
      
      let currentCount = 0;
      if (resource === 'products') {
         currentCount = await prisma.product.count({
           where: { category: { restaurantId } }
         });
      } else if (resource === 'categories') {
         currentCount = await prisma.category.count({
           where: { restaurantId }
         });
      } else if (resource === 'employees') {
         currentCount = await prisma.user.count({
           where: { 
             restaurantId,
             role: "User" // Only count staff members
           }
         });
      }

      if (currentCount >= limit) {
        return res.status(403).json({
          success: false,
          message: `Your ${resource} limit (${limit}) has been reached. Please upgrade your plan.`,
          code: "LIMIT_REACHED",
          currentCount,
          limit,
        });
      }
      next();
    } catch (error) {
      console.error("FeatureLimit Error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
};
