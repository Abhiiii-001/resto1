
import { Duration } from "@prisma/client";
import prisma from "../config/prisma";
// Get the range for the PREVIOUS duration
const getPreviousRange = (duration: Duration): { from: Date; to: Date; labelDate: Date } => {
  const now = new Date();
  let from: Date;
  let to: Date;
  let labelDate: Date;

  if (duration === Duration.Day) {
    to = new Date(now.setHours(0, 0, 0, 0)); // today at 00:00
    from = new Date(to);
    from.setDate(from.getDate() - 1); // yesterday at 00:00
    labelDate = new Date(from); // summary for yesterday
  } else if (duration === Duration.Week) {
    // Get start of current week
    const today = new Date();
    const currentWeekDay = today.getDay();
    const diffToMonday = currentWeekDay === 0 ? -6 : 1 - currentWeekDay;

    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() + diffToMonday);
    thisWeekStart.setHours(0, 0, 0, 0);

    from = new Date(thisWeekStart);
    from.setDate(from.getDate() - 7); // start of last week

    to = new Date(thisWeekStart); // end of last week
    labelDate = new Date(from);
  } else {
    const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    from = new Date(firstOfThisMonth);
    from.setMonth(from.getMonth() - 1); // first day of last month
    to = new Date(firstOfThisMonth); // first of this month
    labelDate = new Date(from);
  }

  return { from, to, labelDate };
};

export const calculateSummary = async (duration: Duration) => {
  const { from, to, labelDate } = getPreviousRange(duration);

  const restaurants = await prisma.restaurant.findMany();

  for (const restaurant of restaurants) {

    

    const orders = await prisma.order.findMany({
      where: {
        restaurantId: restaurant.id,
        isVerified: true,
        createdAt: {
          gte: from.toISOString(),
          lt: to.toISOString(),
        },
      },
    });

    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);

    await prisma.saleSummary.create({
      data: {
        amount: totalAmount,
        duration,
        orders: orders.length,
        createdAt: labelDate.toISOString(), // set to start of the period
        restaurantId: restaurant.id,
      },
    });


    

    if(duration === "Day"){
        await prisma.restaurant.update({
            where:{
                id: restaurant.id,
                isVerified: true
            },
            data:{
                totalEarning:{
                    increment: totalAmount
                },
                totalOrders: {
                    increment: orders.length
                }
            }
        })
    }
  }
};

