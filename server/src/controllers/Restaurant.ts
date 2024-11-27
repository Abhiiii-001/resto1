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