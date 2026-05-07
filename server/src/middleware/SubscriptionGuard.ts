import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { SUBSCRIPTION_STATUS, PLAN_TYPE } from "../constants";

const prisma = new PrismaClient();

export const SubscriptionGuard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const restaurantId = req.user?.restaurantId || req.user?.id;

    if (!restaurantId) {
      return res.status(401).json({ success: false, message: "Unauthorized access." });
    }

    const subscription = await prisma.subscription.findFirst({
      where: { restaurantId },
      include: { plan: true },
    });

    if (!subscription || subscription.status === SUBSCRIPTION_STATUS.EXPIRED) {
      return res.status(403).json({
        success: false,
        message: "Subscription required or expired",
        code: "SUBSCRIPTION_EXPIRED",
      });
    }

    // Check if trial/period has ended
    const now = new Date();
    if (subscription.trialEndsAt && now > subscription.trialEndsAt && subscription.plan.type === PLAN_TYPE.DEMO) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: SUBSCRIPTION_STATUS.EXPIRED },
      });
      return res.status(403).json({
        success: false,
        message: "Trial expired. Please upgrade.",
        code: "TRIAL_EXPIRED",
      });
    }

    req.subscription = subscription; // Attach for downstream use
    next();
  } catch (error) {
    console.error("SubscriptionGuard Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
