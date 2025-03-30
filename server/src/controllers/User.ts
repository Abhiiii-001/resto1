import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();
export const GetAllUsers = async(req: Request,res: Response):Promise<any> => {
    try {
        const restaurantId= req.params.restaurantId;
        const users = await prisma.user.findMany({
            where:{
                restaurantId: restaurantId
                
            }
        })

        return res.status(200).json({success: true,message:"All user fetched successfully!",users: users})

    } catch (error) {
        console.log(error);
        return res.status(499).json({success: false,message: "Something wrong during user fetching!"})
    }
}
export const UpdateUser = async(req: Request,res: Response):Promise<any> => {
    try {
        const {userId} = req.params;
        const updatedData = req.body;

        const user = await prisma.user.update({
            where:{id: userId},
            data: updatedData
        });

        if(!user) return res.status(404).json({success: false,message: "User not found!"});

        return res.status(200).json({success: true,message: "User updated!",user: user});
    } catch (error) {
        console.log(error);
        return res.status(499).json({succcess: false,message: "Something wrong during user updating!"})
    }
}
export const DeleteUser = async(req: Request,res: Response):Promise<any> => {
    try {
        const { userId } = req.params;
        
        const user = await prisma.user.delete({
            where:{
                id:userId
            }
        });
        if(!user) return res.status(404).json({success: false,message: "User not found"});
        return res.status(200).json({success: true,message: "User deleted!"})
    } catch (error) {
        console.log(error);
        return res.status(499).json({success: false,message: "Something wrong during user deleting!"})
    }
}

export const CreateUser = async(req: Request,res: Response):Promise<any> => {
    try {
        const { name , number , email , role} = req.body;
        const { restaurantId } = req.params;

        if(!name || !number || !email){
            return res.status(401).json({
                success: false,
                message: "All field required!"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        const existingRestraurant = await prisma.restaurant.findUnique({
            where:{email}
        });

        if(existingRestraurant || existingUser){
            return res.status(403).json({
                success: false,
                message: "Email is already registered!"
            });
        }

        const defaultPassword = "123456";
        const hashedPassword = (await bcrypt.hash(defaultPassword,10)).toString();

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                number,
                restaurantId,
                canModify: false,
                role,
                verificationToken:"",
                isVerified: true
            }
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: user
        })

    } catch (error) {
        return res.status(499).json({
            success: false,
            message: "Something wrong while user creation"
        });
    }
}