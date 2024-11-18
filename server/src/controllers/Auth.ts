import { Request , Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'
import fs from 'fs'
import mailSender from '../utils/mailSender'
import uploadToCloudinary from "../utils/cloudinaryUploader"


//  ********************   INTERFACES   ************************
interface UserSignupInterface{
    email: string
    password: string
    name?: string
    number: string
    canModify?: boolean
    restaurantId: string
}

interface RestaurantSignupInterface {
    name: string
    slogan?: string
    number: string
    address: string
    email: string
    password: string
};

const prisma = new PrismaClient()

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
            number:parseInt(number),
            canModify,
            restaurantId:parseInt(restaurantId),
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
      return res.status(500).json({message:"Internal server error"});
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

    const thumbnailUploadRes = await uploadToCloudinary(file,'my-files');
    console.log("UPLOAD FILE RESPONSE : ",thumbnailUploadRes);
    // fs.unlinkSync(file.tempFilePath); 

    
    const existingUser = await prisma.user.findUnique({
        where:{email}
    });

    const existingRestraurant = await prisma.restaurant.findUnique({
          where:{email}
    })

    if(existingRestraurant || existingUser){
        return res.status(401).json({message:"Email Already Taken!"})
    }


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
        message:"User created! , Waiting for verification by Restaurant",
        user:restaurant,
        mailResponse:mailResponse?.response
    });
   } catch (error:any) {
      console.log("Error",error.message);
      return res.status(500).json({message:"Internal server error"});
   }
}