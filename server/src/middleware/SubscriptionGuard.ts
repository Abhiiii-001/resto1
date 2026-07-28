import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { SUBSCRIPTION_STATUS, PLAN_TYPE } from "../constants";

export const SubscriptionGuard = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const restaurantId = req.user?.restaurantId || req.user?.id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Unauthorized access." });
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

    // Check if billing/demo period has ended for ANY plan type
    const now = new Date();
    if (now > subscription.currentPeriodEnd) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: SUBSCRIPTION_STATUS.EXPIRED },
      });
      return res.status(403).json({
        success: false,
        message: subscription.plan.isDemo
          ? "Demo period expired. Please upgrade your plan."
          : "Subscription period expired. Please renew.",
        code: "SUBSCRIPTION_EXPIRED",
      });
    }

    req.subscription = subscription; // Attach for downstream use
    next();
  } catch (error) {
    console.error("SubscriptionGuard Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
