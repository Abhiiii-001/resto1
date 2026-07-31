import { Request, Response } from "express";
import prisma from "../config/prisma";

export const GetDashboardData = async (req: Request, res: Response): Promise<any> => {
    try {

        const { restaurantId } = req.params;

        if (!restaurantId) {
            return res.status(404).json({
                success: false,
                message: "Data missing!"
            })
        }

        const restaurant = await prisma.restaurant.findFirst({
            where: {
                id: restaurantId
            },
            select: {
                totalEarning: true,
                totalOrders: true,
                totalQRScan: true
            }
        })

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found!"
            })
        }

        const daySummary = await prisma.saleSummary.findMany({
            where: {
                restaurantId,
                duration: "Day"
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 7
        });


        const monthSummary = await prisma.saleSummary.findMany({
            where: {
                restaurantId,
                duration: "Month"
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 12
        });

        const products = await prisma.productVariant.findMany({
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

        const statusCounts = await prisma.order.groupBy({
            by: ['status'],
            where: {
                restaurantId: restaurantId
            },
            _count: {
                _all: true,
            },
        });

        const label: string[] = [];
        const statusData: number[] = [];
        let totalPending = 0;

        for (const status of statusCounts) {
            label.push(status.status);
            statusData.push(status._count._all)
            if (status.status === 'Pending') {
                totalPending = status._count._all;
            }
        }

        const dahsboardData = {
            stats: {
                ...restaurant,
                totalPending
            },
            saleSummary: {
                day: daySummary,
                month: monthSummary
            },
            products,
            status: {
                label: [...label],
                data: [...statusData]
            }
        }



        return res.status(200).json({
            success: true,
            message: "Data fetched",
            data: dahsboardData
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || error?.data?.message
        })
    }
}
