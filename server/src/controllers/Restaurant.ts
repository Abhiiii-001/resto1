import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import uploadToCloudinary from "../utils/cloudinaryUploader";

const prisma = new PrismaClient();

export const GetAllRestaurants = async(req: Request,res: Response):Promise<any> => {
    try {
        const restaurant = await prisma.restaurant.findMany({
            select:{
                id: true,
                name: true,
                resCode: true,
                thumbnail: true,
                slogan: true
            }
        });
        //console.log(restaurant);
        return res.status(200).json({message: "Restaurants name fetched",restaurant: restaurant})
    } catch (error) {
        //console.log("Error during get all restaurants",error);
    }
}

export const GetRestaurantDetails = async(req: Request, res: Response):Promise<any> => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await prisma.restaurant.findUnique({
            where:{
                id: restaurantId
            },
            include: {
                subscription: {
                    include: {
                        plan: true
                    }
                }
            }
        });
        if(!restaurant){
            return res.status(404).json({
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
        //console.log("Error during get restaurant details",error);
        return res.status(500).json({
            success: false,
            message: "Shop details didn't fetched!",
        })
    }
}

export const UpdateRestaurantDetails = async(req: Request,res: Response):Promise<any> => {
    try {
        const { restaurantId } = req.params;
        const data = req.body;
        const thumbnail = req.files?.thumbnail;
        if(!restaurantId || (!data && !thumbnail)){
            return res.status(401).json({
                success: false,
                message: "Missing data!"
            });
        }

        // //console.log("data",data,thumbnail);
        // //console.log(restaurantId)

        const restaurant = await prisma.restaurant.findUnique({
            where:{
                id: restaurantId,
                isActive: true
            },
            select:{
                id: true,
                thumbnail: true
            }
        });
        // //console.log("restaurant",restaurant);

        if(!restaurant){
            return res.status(404).json({
                success: false,
                message: "Restaurant not found!"
            });
        }

        if(thumbnail){
            const uploadRes = await uploadToCloudinary(thumbnail,"my-files");
            data.thumbnail = uploadRes.secure_url;
            //console.log("Restaurant update thumbnail",data.thumbnail)
        }
        
        const updatedRestaurant = await prisma.restaurant.update({
            where:{
                id: restaurantId,
                isActive: true
            },
            data: {...data}
        });
        
        //console.log("Updated restauarant",updatedRestaurant);

        return res.status(200).json({
            success: true,
            message: "Restaurant details updated!",
            data: updatedRestaurant
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something wrong!"
        })
    }
}

export const DeleteRestaurant = async(req: Request,res: Response): Promise<any> => {
    try {
        const { restaurantId } = req.params;

        if(!restaurantId){
            return res.status(401).json({
                success: "false",
                message: "Data missing!"
            });
        }

        await prisma.restaurant.update({
            where:{
                id: restaurantId
            },
            data: {
                isActive: false
            }
        });
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "User deleted!"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}
