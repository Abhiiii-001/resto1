import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import mailSender from "../utils/mailSender";
import { renderUserWelcome } from "../emails";
import prisma from "../config/prisma";
export const GetAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const restaurantId = req.params.restaurantId;
        const users = await prisma.user.findMany({
            where: {
                restaurantId: restaurantId

            }
        })

        return res.status(200).json({ success: true, message: "All user fetched successfully!", users: users })

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ success: false, message: "Something wrong during user fetching!" })
    }
}
export const UpdateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: updatedData
        });

        if (!user) return res.status(404).json({ success: false, message: "User not found!" });

        return res.status(200).json({ success: true, message: "User updated!", data: user });
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ succcess: false, message: "Something wrong during user updating!" })
    }
}
export const DeleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;

        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        return res.status(200).json({ success: true, message: "User deleted!" })
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ success: false, message: "Something wrong during user deleting!" })
    }
}

export const CreateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, number, email, role } = req.body;
        const { restaurantId } = req.params;

        if (!name || !number || !email) {
            return res.status(400).json({
                success: false,
                message: "All field required!"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const existingRestraurant = await prisma.restaurant.findUnique({
            where: { email }
        });

        if (existingRestraurant || existingUser) {
            return res.status(403).json({
                success: false,
                message: "Email is already registered!"
            });
        }

        const defaultPassword = "123456";
        const hashedPassword = (await bcrypt.hash(defaultPassword, 10)).toString();

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                number,
                restaurantId,
                canModify: false,
                role,
                verificationToken: crypto.randomUUID().toString(),
                isVerified: true
            }
        });

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: restaurantId
            }
        });

        // Fire email asynchronously in background to avoid blocking API response latency
        mailSender(
            user.email,
            "You are added to " + (restaurant?.name || "the restaurant"),
            renderUserWelcome({
                userName: user.name || "Employee",
                loginUrl: `${process.env.CLIENT_URL || ''}/signin`
            })
        );

        return res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: user
        })

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            success: false,
            message: "Something wrong while user creation"
        });
    }
}

export const GetUserDetailsById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Data missing!"
            });
        }

        const userDetails = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: false,
            message: 'User data fetched successfully',
            data: userDetails
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message
        });
    }
}
