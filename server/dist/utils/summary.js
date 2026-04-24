"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSummary = void 0;
const client_1 = require("@prisma/client");
const client_2 = require("@prisma/client");
const prisma = new client_2.PrismaClient();
// Get the range for the PREVIOUS duration
const getPreviousRange = (duration) => {
    const now = new Date();
    let from;
    let to;
    let labelDate;
    if (duration === client_1.Duration.Day) {
        to = new Date(now.setHours(0, 0, 0, 0)); // today at 00:00
        from = new Date(to);
        from.setDate(from.getDate() - 1); // yesterday at 00:00
        labelDate = new Date(from); // summary for yesterday
    }
    else if (duration === client_1.Duration.Week) {
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
    }
    else {
        const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        from = new Date(firstOfThisMonth);
        from.setMonth(from.getMonth() - 1); // first day of last month
        to = new Date(firstOfThisMonth); // first of this month
        labelDate = new Date(from);
    }
    return { from, to, labelDate };
};
const calculateSummary = (duration) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, labelDate } = getPreviousRange(duration);
    const restaurants = yield prisma.restaurant.findMany();
    for (const restaurant of restaurants) {
        const orders = yield prisma.order.findMany({
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
        yield prisma.saleSummary.create({
            data: {
                amount: totalAmount,
                duration,
                orders: orders.length,
                createdAt: labelDate.toISOString(), // set to start of the period
                restaurantId: restaurant.id,
            },
        });
        if (duration === "Day") {
            yield prisma.restaurant.update({
                where: {
                    id: restaurant.id,
                    isVerified: true
                },
                data: {
                    totalEarning: {
                        increment: totalAmount
                    },
                    totalOrders: {
                        increment: orders.length
                    }
                }
            });
        }
    }
});
exports.calculateSummary = calculateSummary;
