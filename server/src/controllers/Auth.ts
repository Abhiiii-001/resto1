import { Request, Response } from "express"
import prisma from '../config/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mailSender from '../utils/mailSender'
import logger from '../utils/logger'
import {
   renderRestaurantVerification,
   renderUserVerification,
   renderRestaurantWelcome,
   renderUserWelcome,
   renderResetPassword,
} from '../emails'
import uploadToCloudinary from "../utils/cloudinaryUploader"

import dotenv from "dotenv"
import { generateRandomNumber } from "../utils/randomCode"
import { PLAN_TYPE, SUBSCRIPTION_STATUS } from "../constants";
import crypto from "crypto";
dotenv.config();

//  ********************   INTERFACES   ************************
interface UserSignupInterface {
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

interface LoginInterface {
   email: string
   password: string
}

//  *************** SIGNUP ENDPOINTS  *****************

export const UserSignup = async (req: Request, res: Response): Promise<any> => {
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
         where: { email }
      });

      const existingRestraurant = await prisma.restaurant.findUnique({
         where: { email }
      })

      if (existingRestraurant || existingUser) {
         return res.status(402).json({ success: false, message: "Email Already Taken!" })
      }

      const restaurant = await prisma.restaurant.findUnique({
         where: {
            id: restaurantId
         }
      });

      if (!restaurant) {
         return res.status(404).json({ success: false, message: "Restaurant Id is not correct" });
      }

      // Check employee limit from the restaurant's subscription
      const subscription = await prisma.subscription.findFirst({
         where: { restaurantId },
         include: { plan: true },
      });

      if (subscription && subscription.plan.maxEmployees !== -1) {
         const verifiedEmployeeCount = await prisma.user.count({
            where: { restaurantId, isVerified: true },
         });

         if (verifiedEmployeeCount >= subscription.plan.maxEmployees) {
            return res.status(403).json({
               success: false,
               message: `This restaurant has reached its employee limit (${subscription.plan.maxEmployees}). The owner needs to upgrade their plan.`,
               code: "LIMIT_REACHED",
            });
         }
      }

      const hashedPassword: string = (await bcrypt.hash(password, 10)).toString();
      const verificationToken = crypto.randomUUID().toString();

      const user = await prisma.user.create({
         data: {
            email,
            password: hashedPassword,
            name,
            number,
            canModify,
            restaurantId: restaurantId,
            verificationToken
         }
      });

      if (!user)
         return res.status(449).json({ success: false, message: "Something wrong while user creation!" });

      const verificationLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

      // Send employee approval email to Restaurant Owner asynchronously
      mailSender(
         restaurant.email,
         "Employee Verification Required",
         renderUserVerification({
            employeeName: name || email,
            restaurantName: restaurant.name,
            verificationUrl: verificationLink
         })
      );

      const { password: _, verificationToken: __, ...safeUser } = user;

      logger.info(`New Employee Signed Up: ${email}`);
      return res.status(200).json({
         success: true,
         message: "User created! , Waiting for verification by Restaurant",
         user: safeUser,
      });

   } catch (error: any) {
      logger.error("User Signup Failed:", error);
      return res.status(500).json({ success: false, message: "Signup Failed!" });
   }
}

export const RestaurantSignup = async (req: Request, res: Response): Promise<any> => {
   try {
      const reqData: RestaurantSignupInterface = req.body;
      //console.log(reqData);
      const {
         name,
         slogan,
         number,
         address,
         email,
         password,
      } = reqData;

      const file = req.files?.thumbnail;


      //check user is already present
      const existingUser = await prisma.user.findUnique({
         where: { email: email }
      });

      const existingRestraurant = await prisma.restaurant.findUnique({
         where: { email: email }
      })

      if (existingRestraurant || existingUser) {
         return res.status(400).json({ success: false, message: "Email Already Taken!" })
      }

      //upload file
      const thumbnailUploadRes = await uploadToCloudinary(file, 'my-files');

      //hash password
      const hashedPassword: string = (await bcrypt.hash(password, 10)).toString();
      const verificationToken = crypto.randomUUID().toString();

      //generate resCode
      let code = generateRandomNumber(4).toString();
      while (true) {
         const res = await prisma.restaurant.findFirst({
            where: {
               resCode: code
            }
         })
         if (!res) break;
         code = generateRandomNumber(4).toString();
      }

      const restaurant = await prisma.restaurant.create({
         data: {
            name,
            slogan,
            resCode: code,
            thumbnail: thumbnailUploadRes.secure_url,
            number,
            address,
            email,
            password: hashedPassword,
            verificationToken
         },
         omit: {
            password: true,
            verificationToken: true,
         }
      });
      if (!restaurant)
         return res.status(500).json({ success: false, message: "Something wrong while user creation!" });

      // Create a demo subscription for the restaurant (default 14 days demo period)
      const demoPlan = await prisma.plan.findFirst({
         where: { OR: [{ isDemo: true }, { type: PLAN_TYPE.DEMO }] }
      });

      if (demoPlan) {
         const now = new Date();
         const demoDurationDays = 14;
         const periodEnd = new Date(now.getTime() + demoDurationDays * 24 * 60 * 60 * 1000);
         await prisma.subscription.create({
            data: {
               restaurantId: restaurant.id,
               planId: demoPlan.id,
               status: SUBSCRIPTION_STATUS.ACTIVE,
               currentPeriodStart: now,
               currentPeriodEnd: periodEnd,
            }
         });
      }

      const verificationLink = `${process.env.CLIENT_URL || "http://localhost:3001"}/verify/${verificationToken}`;

      // Send verification email asynchronously in background
      mailSender(
         email,
         "Verify Your Restaurant Account",
         renderRestaurantVerification({
            restaurantName: name,
            ownerName: name,
            verificationUrl: verificationLink
         })
      );

      logger.info(`New Restaurant Signed Up: ${email} (${name})`);
      res.status(200).json({
         success: true,
         message: "Account created! Please check your email for verification.",
         user: restaurant,
      });
   } catch (error: any) {
      logger.error("Restaurant Signup Failed:", error);
      return res.status(500).json({ success: false, message: "Signup Failed!" });
   }
}

export const Login = async (req: Request, res: Response): Promise<any> => {
   try {
      const { email, password }: LoginInterface = req.body;

      if (!email || !password) {
         return res.status(403).json({ success: false, message: "All field are required!" });
      }

      let user = await prisma.restaurant.findUnique({
         where: {
            email,
            isActive: true,
         },
      });

      let restaurantId = user?.id;

      if (!user) {
         //@ts-ignore
         user = await prisma.user.findUnique({
            where: {
               email,
            }
         });
         //@ts-ignore
         restaurantId = user?.restaurantId;
      }

      if (!user) {
         return res.status(404).json({ success: false, message: "User not found!" })
      }

      if (!user.isVerified) {
         return res.status(401).json({
            success: false,
            message: "User not verified!"
         })
      }

      const match = await bcrypt.compare(password, user.password);

      //console.log(match);

      if (!match) {
         return res.status(404).json({ success: false, message: "Incorrect Password!" });
      }

      const secret: string = process.env.JWT_SECRET || "secret";

      const token = jwt.sign(
         { id: user.id, email: user?.email, role: user?.role, restaurantId: restaurantId },
         secret,
         { expiresIn: 24 * 60 * 60 * 1000 }
      );

      res.cookie('token', token, {
         httpOnly: true,
         secure: true,
         sameSite: "lax",
         maxAge: 3600000 * 8
      })

      const { password: _, verificationToken: __, ...safeUser } = user;

      logger.info(`Successful login for: ${email}`);
      return res.status(200)
         .set('Authorization', `Bearer ${token}`)
         .json({
            success: true,
            message: "Login successful",
            user: safeUser,
            token: token
         });
   } catch (error: any) {
      logger.error("Login Failed:", error);
      return res.status(500).json({ success: false, message: "Login Failed!" });
   }
}

export const Logout = async (req: Request, res: Response): Promise<any> => {
   try {
      logger.info(`User logged out`);
      res.clearCookie('token'); // Clear the cookie
      res.status(200).json({ success: true, message: "Logged out successfully" });
   } catch (error) {
      logger.error("Logout Failed:", error);
      return res.status(405).json({ success: false, message: "Logout Failed!" });
   }
}


export const VerifyToken = async (req: Request, res: Response): Promise<any> => {
   try {
      const { token } = req.body;

      if (!token) {
         return res.status(404).json({
            success: false,
            message: "Token not found"
         });
      }
      let user: any = await prisma.restaurant.findUnique({
         where: {
            verificationToken: token
         },
         select: {
            id: true,
            role: true,
            email: true,
            name: true,
         }
      });

      if (!user) {
         user = await prisma.user.findUnique({
            where: {
               verificationToken: token
            },
            select: {
               id: true,
               role: true,
               email: true,
               name: true,
            }
         });
      }

      if (!user) {
         return res.status(401).json({
            success: false,
            message: "Invalid Token"
         })
      }

      if (user.role == "Restaurant") {
         await prisma.restaurant.update({
            where: {
               verificationToken: token
            },
            data: {
               isVerified: true,
               // verificationToken: ""
            }
         })

         mailSender(
            user.email,
            "Welcome to Restroo!",
            renderRestaurantWelcome({
               restaurantName: user.name,
               ownerName: undefined,
               dashboardUrl: `${process.env.CLIENT_URL}/dashboard`
            })
         );
      }
      else {
         await prisma.user.update({
            where: {
               verificationToken: token
            },
            data: {
               isVerified: true,
               // verificationToken:""
            }
         })

         // Send verified email to User so they can login
         mailSender(
            user.email,
            "Your Account is Verified!",
            renderUserWelcome({
               userName: user.name || "Employee",
               loginUrl: `${process.env.CLIENT_URL || ''}/signin`
            })
         );
      }

      return res.status(200).json({
         success: true,
         message: "User verified successfully!"
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Something went wrong!"
      })
   }
}

export const ChangePassword = async (req: Request, res: Response): Promise<any> => {
   try {
      const { currentPassword, newPassword, role } = req.body;
      const { id } = req.params;

      if (!currentPassword || !newPassword || !role || !id) {
         return res.status(401).json({
            success: false,
            message: 'Data missing!'
         });
      }

      let user;
      if (role === "Restaurant") {
         user = await prisma.restaurant.findUnique({
            where: { id }
         });
      }
      else if (role === "User") {
         user = await prisma.user.findUnique({
            where: { id }
         });
      }

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found!"
         });
      }

      const hashedCurrentPassword = await bcrypt.hash(currentPassword, 10);
      const match = bcrypt.compare(user?.password, hashedCurrentPassword);

      if (!match) {
         return res.status(404).json({
            success: false,
            message: "Incorrect Password!"
         });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      if (role === "Restaurant") {
         await prisma.restaurant.update({
            where: { id },
            data: {
               password: hashedNewPassword
            }
         });
      }
      else if (role === "User") {
         await prisma.user.update({
            where: { id },
            data: {
               password: hashedNewPassword
            }
         });
      }

      return res.status(200).json({
         success: true,
         message: "Password changed!"
      })

   } catch (error: unknown) {
      return res.status(500).json({
         success: false,
         message: "Something went wrong!"
      })
   }
}

export const ResetPassword = async (req: Request, res: Response): Promise<any> => {
   try {

      const { email } = req.body;

      if (!email) {
         return res.status(401).json({
            success: false,
            message: 'Data missing!'
         });
      }

      let user: any = await prisma.user.findUnique({
         where: {
            email,
            isVerified: true
         }
      });

      if (!user) {
         user = await prisma.restaurant.findUnique({
            where: {
               email,
               isVerified: true
            }
         });
      }

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found!"
         });
      }

      const verificationToken = crypto.randomUUID().toString();
      const verificationLink = `${process.env.CLIENT_URL}/reset-password/${verificationToken}`;

      if (user.role === "Restaurant") {
         await prisma.restaurant.update({
            where: { email },
            data: { verificationToken }
         })
      }
      else if (user.role === "User") {
         await prisma.restaurant.update({
            where: { email },
            data: { verificationToken }
         })
      }

      mailSender(
         email,
         "Reset Your Restroo Account Password",
         renderResetPassword({
            userName: user.name || "User",
            resetUrl: verificationLink
         })
      );

      return res.status(200).json({
         success: true,
         message: "Check email , for reset the password"
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Something went wrong!"
      })
   }
}

export const ResetPasswordMaker = async (req: Request, res: Response): Promise<any> => {
   try {

      const { password } = req.body;
      const { verificationToken } = req.params;

      if (!password || !verificationToken) {
         return res.status(401).json({
            success: false,
            message: 'Data missing!'
         });
      }

      let user: any = await prisma.user.findUnique({
         where: { verificationToken }
      });

      if (!user) {
         user = await prisma.restaurant.findUnique({
            where: { verificationToken }
         });
      }

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found!"
         });
      }

      const hashedNewPassword = (await bcrypt.hash(password, 10)).toString();
      if (user.role === "Restaurant") {
         await prisma.restaurant.update({
            where: { id: user.id },
            data: {
               password: hashedNewPassword
            }
         });
      }
      else if (user.role === "User") {
         await prisma.user.update({
            where: { id: user.id },
            data: {
               password: hashedNewPassword
            }
         });
      }

      return res.status(200).json({
         success: true,
         message: "Password changed!"
      })

   } catch (error) {
      return res.status(500).json({
         success: false,
         message: "Something went wrong!"
      })
   }
}
