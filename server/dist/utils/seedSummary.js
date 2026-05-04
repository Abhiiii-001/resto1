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
exports.seedSaleSummary = seedSaleSummary;
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const prisma = new client_1.PrismaClient();
function getRandomAmount() {
    return Math.floor(Math.random() * 100000) + 100; // Between 100 and 10100
}
function getRandomOrder() {
    return Math.floor(Math.random() * 600) + 50;
}
function getFormattedISOString(offsetDays) {
    const date = new Date();
    date.setDate(date.getDate() - offsetDays);
    return date.toISOString();
}
function seedSaleSummary(restaurantId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saleData = [];
            // Seed for last 7 days (Day duration)
            for (let i = 0; i < 7; i++) {
                saleData.push({
                    id: (0, uuid_1.v4)(),
                    amount: getRandomAmount(),
                    duration: 'Day',
                    orders: getRandomOrder(),
                    createdAt: getFormattedISOString(i),
                    restaurantId,
                });
            }
            // Seed for last 12 months (Month duration)
            const now = new Date();
            for (let i = 0; i < 12; i++) {
                const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                saleData.push({
                    id: (0, uuid_1.v4)(),
                    amount: getRandomAmount() * 30,
                    duration: 'Month',
                    orders: getRandomOrder() * 30,
                    createdAt: date.toISOString(),
                    restaurantId,
                });
            }
            // Insert into DB
            yield prisma.saleSummary.createMany({ data: saleData });
            //console.log('✅ Seeded SaleSummary data successfully!');
        }
        catch (error) {
            console.error('❌ Failed to seed SaleSummary:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
