import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";


const prisma = new PrismaClient();
export const GetAllUsers = async(req: Request,res: Response) => {
    try {
        const restaurantId= req.params.restaurantId;
        const users = await prisma.user.findMany({
            where:{
                restaurantId: restaurantId
                
            }
        })

        return res.status(200).json({message:"All user fetched successfully!",users: users})

    } catch (error) {
        console.log(error);
        return res.status(499).json({message: "Something wrong during user fetching!"})
    }
}
export const UpdateUser = async(req: Request,res: Response) => {
    try {
        const {userId} = req.params;
        const updatedData = req.body;

        const user = await prisma.user.update({
            where:{id: userId},
            data: updatedData
        });

        if(!user) return res.status(404).json({message: "User not found!"});

        return res.status(200).json({message: "User updated!",user: user});
    } catch (error) {
        console.log(error);
        return res.status(499).json({message: "Something wrong during user updating!"})
    }
}
export const DeleteUser = async(req: Request,res: Response) => {
    try {
        const { userId } = req.params;
        
        const user = await prisma.user.delete({
            where:{
                id:userId
            }
        });
        if(!user) return res.status(404).json({message: "User not found"});
        return res.status(200).json({message: "User deleted!"})
    } catch (error) {
        console.log(error);
        return res.status(499).json({message: "Something wrong during user deleting!"})
    }
}