import cron from "node-cron";
import { Duration } from "@prisma/client";
import { calculateSummary } from "../utils/summary";
import { SUBSCRIPTION_STATUS } from "../constants";
import prisma from "../config/prisma";

// Run every day at 00:05 to expire subscriptions
cron.schedule("5 0 * * *", async () => {
  try {
    const now = new Date();
    
    // Find active subscriptions that have passed their currentPeriodEnd
    const expiredSubscriptions = await prisma.subscription.updateMany({
      where: {
        status: SUBSCRIPTION_STATUS.ACTIVE,
        currentPeriodEnd: { lt: now }
      },
      data: {
        status: SUBSCRIPTION_STATUS.EXPIRED
      }
    });

    if (expiredSubscriptions.count > 0) {
       console.log(`[Cron] Expired ${expiredSubscriptions.count} subscriptions.`);
    }
  } catch (error) {
    console.error("[Cron] Subscription Expiry Error:", error);
  }
});

// Run every day at 00:10 (after day ends)
cron.schedule("10 0 * * *", async () => {
  //console.log("Calculating DAILY summary...");
  await calculateSummary(Duration.Day);
});

// Run every 1st of month at 00:30
cron.schedule("30 0 1 * *", async () => {
  //console.log("Calculating MONTHLY summary...");
  await calculateSummary(Duration.Month);
});
