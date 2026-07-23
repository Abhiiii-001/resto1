/// <reference path="../types/express.d.ts" />
import { Request , Response , NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import prisma from "../config/prisma";
dotenv.config();

export const Auth = async(req: Request,res: Response,next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies.token ||
                      req.body.token    ||
                      req.headers.authorization?.split(" ")[1];
        // //console.log("cookie",req.cookies);
        // //console.log("body",req.body);
        // //console.log("headers",req.headers);
        if(!token)
            return res.status(401).json({message: "Missing data"});

        const secret: string = process.env.JWT_SECRET || "secret";
        const decoded =  jwt.verify(token,secret);

        //console.log(decoded);    //id email role restaurantId
        req.user = decoded as Express.Request['user'];   
        next();
    } catch (error) {
        //console.log(error);
        return res.status(405).json({message:"Authentication Failed!"});
    }
}


export const IsRestaurant = async(req: Request,res: Response,next: NextFunction):Promise<any> => {
    try {
        if (!req.user?.email) return res.status(401).json({message: "Unauthorized Access!"});
        const user = await prisma.restaurant.findUnique({
            where:{email: req.user.email, isActive: true}      
        });
        if(!user)
            return res.status(404).json({message: "Unautorized Access!"});

        next();
    } catch (error) {
        //console.log(error);
        return res.status(405).json({message:"Autorization Failed!"});
    }
}

export const IsUser = async(req: Request,res: Response,next: NextFunction) => {
    try {
        if (!req.user?.email) return res.status(401).json({message: "Unauthorized Access!"});
        const user = await prisma.user.findUnique({
            where:{email: req.user.email}
        });

        if(!user || user?.role !== "User")
            return res.status(404).json({message: "Unautorized Access!"});

        next();
    } catch (error) {
        //console.log(error);
        return res.status(405).json({message:"Autorization Failed!"});
    }
}

export const IsAdmin = async(req: Request,res: Response,next: NextFunction) => {
    try {
        if (!req.user?.email) return res.status(401).json({message: "Unauthorized Access!"});
        const user = await prisma.user.findUnique({
            where:{email: req.user.email}
        });

        if(!user || user?.role !== "Admin")
            return res.status(404).json({message: "Unautorized Access!"});

        next();
    } catch (error) {
        //console.log(error);
        return res.status(405).json({message:"Autorization Failed!"});
    }
}

export const IsModifier = async(req: Request,res: Response,next: NextFunction):Promise<any> => {
    try {
        if(req.user?.role == "User"){
            if (!req.user?.email) return res.status(401).json({message: "Unauthorized Access!"});
            const user = await prisma.user.findUnique({
                where:{email: req.user.email}
            })

            if(!user || !user.canModify){
                return res.status(401).json({
                    success: false,
                    message: "Not authorized"
                })
            }
        }
        next();

    } catch (error) {
        //console.log(error);
        return res.status(405).json({message:"Autorization Failed!"});
    }
}
