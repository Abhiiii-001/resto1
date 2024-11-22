import { Request , Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import mailSender from '../utils/mailSender'
import uploadToCloudinary from "../utils/cloudinaryUploader"

import dotenv from "dotenv"
dotenv.config();

//  ********************   INTERFACES   ************************
interface UserSignupInterface{
    email: string
    password: string
    name?: string
    number: number
    canModify?: boolean
    restaurantId: number
}

interface RestaurantSignupInterface {
    name: string
    slogan?: string
    number: string
    address: string
    email: string
    password: string
};

interface LoginInterface {
   email: string
   password: string
}

const prisma = new PrismaClient({
  datasources: {
      db: { url: process.env.DATABASE_URL },
  },
});

//  *************** SIGNUP ENDPOINTS  *****************

export const UserSignup = async(req: Request,res: Response): Promise<any> => {
     try {
      const reqData: UserSignupInterface = req.body;
      const {
        email,
        password,
        name,
        number,
        canModify = false,
        restaurantId
      } = reqData;

      const existingUser = await prisma.user.findFirst({
        where:{email}
      });

      const existingRestraurant = await prisma.restaurant.findUnique({
          where:{email}
      })

      if(existingRestraurant || existingUser){
        return res.status(401).json({message:"Email Already Taken!"})
      }

      const restaurant = await prisma.restaurant.findUnique({
        where:{
            id:restaurantId
        }
      });

      if(!restaurant){
        return res.status(401).json({message:"Restaurant Id is not correct"});
      }

      const hashedPassword: string = (await bcrypt.hash(password,10)).toString();
      const verificationToken =  crypto.randomUUID().toString();

      const user = await prisma.user.create({
        data:{
            email,
            password:hashedPassword,
            name,
            number,
            canModify,
            restaurantId:restaurantId,
            verificationToken
        }
      });

      if(!user)
        return res.status(500).json({message:"Something wrong while user creation!"});

      const verificationLink = `${process.env.CLIET_URL}/verify?token=${verificationToken}`;
      
      const mailResponse = await mailSender(
        restaurant.email,
        "Verify User",
        `<p>Click <a href="${verificationLink}">here</a> to verify employee email.</p>`
      );

      res.status(200).json({
        message:"User created! , Waiting for verification by Restaurant",
        user:user,
        mailResponse:mailResponse?.response
    });

     } catch (error:any) {
      console.log("Error",error.message);
      return res.status(500).json({message:"Signup Failed!"});
   }
}

export const RestaurantSignup = async(req: Request,res: Response): Promise<any> => {
   try {
    const reqData: RestaurantSignupInterface = req.body;
    console.log(reqData);
    const {
        name,
        slogan,
        number,
        address,
        email,
        password,
    } = reqData;

    const file:any = req.files?.thumbnail;
    console.log(file);

    
    
    const existingUser = await prisma.user.findUnique({
       where:{email}
      });
      
      const existingRestraurant = await prisma.restaurant.findUnique({
         where:{email}
      })
      
      if(existingRestraurant || existingUser){
         return res.status(401).json({message:"Email Already Taken!"})
      }
      const thumbnailUploadRes = await uploadToCloudinary(file,'my-files');
      console.log("UPLOAD FILE RESPONSE : ",thumbnailUploadRes);
      // fs.unlinkSync(file.tempFilePath); 


    const hashedPassword: string = (await bcrypt.hash(password,10)).toString();
    const verificationToken =  crypto.randomUUID().toString();
    console.log("verification token",verificationToken);

    const parsedNumber = parseInt(number)
    const restaurant = await prisma.restaurant.create({
        data:{
            name,
            slogan,
            thumbnail:thumbnailUploadRes.secure_url,
            number:parsedNumber,
            address,
            email,
            password:hashedPassword,
        }
    });
    console.log(restaurant)
    if(!restaurant)
        return res.status(500).json({message:"Something wrong while user creation!"});

      const verificationLink = `${process.env.CLIET_URL}/verify?token=${verificationToken}`;
      
      const mailResponse = await mailSender(
        email,
        "Verify User",
        `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
      );

      res.status(200).json({
        message:"User created! , Waiting for verification",
        user:restaurant,
        mailResponse:mailResponse?.response
    });
   } catch (error:any) {
      console.log("Error",error.message);
      return res.status(500).json({message:"Signup Failed!"});
   }
}

export const Login = async(req: Request,res: Response): Promise<any> => {
     try {
      const { email , password }: LoginInterface = req.body;

      if(!email || !password){
         return res.status(403).json({ message: "All field are required!"});
      }
 
      const user = await prisma.restaurant.findUnique({
         where:{email}
      });

      let restaurantId = user?.id;
 
      if(!user){
         const user = await prisma.user.findUnique({
           where:{email}
         });
         restaurantId = user?.restaurantId;
      }
 
      if(!user){
         return res.status(404).json({message: "User not found!"})
      }
 
      const hashedPassword = await bcrypt.hash(password,10);
      const match = bcrypt.compare(user?.password,hashedPassword);
 
      if(!match){
         return res.status(404).json({message: "Incorrect Password!"});
      }
 
      const secret:string = process.env.JWT_SECRET || "secret";
 
      const token = jwt.sign(
         {id: user.id , email: user?.email,role: user?.role,restaurantId: restaurantId},
         secret,
         {expiresIn: 24 * 60 * 60 * 1000}
      );
 
      res.cookie('token',token,{
         httpOnly: true,        // Prevent client-side access
         secure: process.env.NODE_ENV === 'production', // Use secure in production
         maxAge: 3600000 * 8        // 8 hour
      })
 
      return res.status(200).set('Authorization', `Bearer ${token}`).json({ message: "Login successful" });
     } catch (error:any) {
      console.log("Error",error.message);
      return res.status(500).json({message:"Login Failed!"});
   }
}

export const Logout = async(req: Request,res: Response): Promise<any> => {
   try {
      res.clearCookie('token'); // Clear the cookie
      res.status(200).json({ message: "Logged out successfully" });
   } catch (error) {
        console.log(error);
        return res.status(405).json({message: "Logout Failed!"});
   }
}