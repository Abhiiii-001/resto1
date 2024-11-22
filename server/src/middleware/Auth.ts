import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
dotenv.config();

const prisma = new PrismaClient();

export const Auth = async(req: Request,res: Response,next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies.token ||
                      req.body.token    ||
                      req.headers.authorization?.split(" ")[1];
        
        if(!token)
            return res.status(401).json({message: "Missing data"});

        const secret: string = process.env.JWT_SECRET || "secret";
        const decoded =  jwt.verify(token,secret);

        console.log(decoded);    //id email role restaurantId
        //@ts-ignore
        req.user = decoded;   
        next();
    } catch (error) {
        console.log(error);
        return res.status(405).json({message:"Authentication Failed!"});
    }
}


export const IsRestaurant = async(req: Request,res: Response,next: NextFunction) => {
    try {
        const user = await prisma.restaurant.findUnique({
            // @ts-ignore
            where:{email: req.user.email}      
        });
        if(!user)
            return res.status(404).json({message: "Unautorized Access!"});

        next();
    } catch (error) {
        console.log(error);
        return res.status(405).json({message:"Autorization Failed!"});
    }
}

export const IsUser = async(req: Request,res: Response,next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            //@ts-ignore
            where:{email: req.user.email}
        });

        if(!user || user?.role !== "User")
            return res.status(404).json({message: "Unautorized Access!"});

        next();
    } catch (error) {
        console.log(error);
        return res.status(405).json({message:"Autorization Failed!"});
    }
}

export const IsAdmin = async(req: Request,res: Response,next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            //@ts-ignore
            where:{email: req.user.email}
        });

        if(!user || user?.role !== "Admin")
            return res.status(404).json({message: "Unautorized Access!"});

        next();
    } catch (error) {
        console.log(error);
        return res.status(405).json({message:"Autorization Failed!"});
    }
}