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
exports.GetDashboardData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const GetDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        if (!restaurantId) {
            return res.status(401).json({
                success: false,
                message: "Data missing!"
            });
        }
        const restaurant = yield prisma.restaurant.findFirst({
            where: {
                id: restaurantId
            },
            select: {
                totalEarning: true,
                totalOrders: true,
                totalQRScan: true
            }
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found!"
            });
        }
        const daySummary = yield prisma.saleSummary.findMany({
            where: {
                restaurantId,
                duration: "Day"
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 7
        });
        const monthSummary = yield prisma.saleSummary.findMany({
            where: {
                restaurantId,
                duration: "Month"
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 12
        });
        const products = yield prisma.productVariant.findMany({
            where: {
                product: {
                    category: {
                        restaurantId: restaurantId
                    }
                }
            },
            include: {
                product: {
                    select: {
                        name: true,
                        thumbnail: true
                    }
                }
            },
            orderBy: {
                sold: "desc"
            },
            take: 15
        });
        const statusCounts = yield prisma.order.groupBy({
            by: ['status'],
            _count: {
                _all: true,
            },
        });
        const label = [];
        const statusData = [];
        let totalPending = 0;
        for (const status of statusCounts) {
            label.push(status.status);
            statusData.push(status._count._all);
            if (status.status === 'Pending') {
                totalPending = status._count._all;
            }
        }
        const dahsboardData = {
            stats: Object.assign(Object.assign({}, restaurant), { totalPending }),
            saleSummary: {
                day: daySummary,
                month: monthSummary
            },
            products,
            status: {
                label: [...label],
                data: [...statusData]
            }
        };
        return res.status(200).json({
            success: true,
            message: "Data fetched",
            data: dahsboardData
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.GetDashboardData = GetDashboardData;
