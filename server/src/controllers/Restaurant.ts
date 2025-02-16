import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const GetAllRestaurants = async(req: Request,res: Response):Promise<any> => {
    try {
        const restaurant = await prisma.restaurant.findMany({
            select:{
                id: true,
                name: true,
                resCode: true
            }
        });
        console.log(restaurant);
        return res.status(200).json({message: "Restaurants name fetched",restaurant: restaurant})
    } catch (error) {
        console.log("Error during get all restaurants",error);
    }
}

export const GetRestaurantDetails = async(req: Request, res: Response):Promise<any> => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await prisma.restaurant.findUnique({
            where:{
                id: restaurantId
            }
        });
        if(!restaurant){
            return res.status(499).json({
                success: false,
                message: "Shop not found!",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Restaurant details fetched!",
            data: restaurant
        })
    } catch (error) {
        console.log("Error during get restaurant details",error);
        return res.status(499).json({
            success: false,
            message: "Shop details didn't fetched!",
        })
    }
}