import cron from "node-cron";
import { Duration } from "@prisma/client";
import { calculateSummary } from "../utils/summary";

// Run every day at 00:10 (after day ends)
cron.schedule("10 0 * * *", async () => {
  //console.log("Calculating DAILY summary...");
  await calculateSummary(Duration.Day);
});

// Run every Monday at 00:20
// cron.schedule("20 0 * * 1", async () => {
//   //console.log("Calculating WEEKLY summary...");
//   await calculateSummary(Duration.Week);
// });

// Run every 1st of month at 00:30
cron.schedule("30 0 1 * *", async () => {
  //console.log("Calculating MONTHLY summary...");
  await calculateSummary(Duration.Month);
});
