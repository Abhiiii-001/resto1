import { Request, Response } from "express";
import uploadToCloudinary from "../utils/cloudinaryUploader";
import prisma from "../config/prisma";
import mailSender from "../utils/mailSender";
import { renderContactThankYou, renderRestuarantApproval } from "../emails";

export const GetAllRestaurants = async (req: Request, res: Response): Promise<any> => {
    try {
        const restaurant = await prisma.restaurant.findMany({
            where: {
                isActive: true,
                isPublish: true
            },
            select: {
                id: true,
                name: true,
                resCode: true,
                thumbnail: true,
                slogan: true
            }
        });
        return res.status(200).json({ message: "Restaurants name fetched", restaurant: restaurant })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error during get all restaurants!"
        })
    }
}

export const GetRestaurantDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: restaurantId,
            },
            include: {
                subscription: {
                    include: {
                        plan: true
                    }
                }
            },
            omit: {
                isVerified: true,
                verificationToken: true
            }
        });
        if (!restaurant) {
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

/**
 * Endpoint use by customer side interface without any middleware
 */
export const GetCustomerRestaurantDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: restaurantId,
            },
            include: {
                subscription: {
                    include: {
                        plan: true
                    }
                }
            }
        });
        if (!restaurant || !restaurant.isActive || !restaurant.isPublished) {
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

export const UpdateRestaurantDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const { restaurantId } = req.params;
        const data = req.body;
        const thumbnail = req.files?.thumbnail;
        if (!restaurantId || (!data && !thumbnail)) {
            return res.status(404).json({
                success: false,
                message: "Missing data!"
            });
        }

        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: restaurantId,
            },
            select: {
                id: true,
                thumbnail: true,
                isActive: true
            }
        });

        if (!restaurant || !restaurant.isActive) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found!"
            });
        }

        if (thumbnail) {
            const uploadRes = await uploadToCloudinary(thumbnail, "my-files");
            data.thumbnail = uploadRes.secure_url;
            //console.log("Restaurant update thumbnail",data.thumbnail)
        }

        const updatedRestaurant = await prisma.restaurant.update({
            where: {
                id: restaurantId,
                isActive: true
            },
            data: { ...data }
        });

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

export const DeleteRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { restaurantId } = req.params;

        if (!restaurantId) {
            return res.status(404).json({
                success: "false",
                message: "Data missing!"
            });
        }

        await prisma.restaurant.update({
            where: {
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

/**
 * Endpoint for restaurant to raise approval for publishing
 */
export const RaiseApprovalForPublish = async (req: Request, res: Response): Promise<any> => {
    try {
        const { restaurantId } = req.params;
        if (!restaurantId) {
            return res.status(404).json({
                success: false,
                message: "Missing data!"
            })
        }
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: restaurantId
            }
        })
        if (!restaurant || restaurant.isPublished) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found!"
            })
        }
        const adminEmail = process.env.ADMIN_EMAIL || process.env.MAIL_USER || "admin@restro.com";
        const title = `New Restaurant Approval Request: ${restaurant.name}`;

        const body = renderRestuarantApproval({
            email: restaurant.email,
            restaurantName: restaurant.name
        });
        // Send email to admin for verification
        mailSender(adminEmail, title, body);

        // Send thank you email to the user
        const thankYouTitle = `Thank you for contacting Restroo`;
        const thankYouBody = renderContactThankYou({ name: restaurant.name });
        mailSender(restaurant.email, thankYouTitle, thankYouBody);

        return res.status(200).json({
            success: true,
            message: "Restaurant approval request sent to admin!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}
