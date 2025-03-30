import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import fs from 'fs'
import crypto from "crypto";
import { Server } from "socket.io"
import { emitNewOrder } from "../socket";
import { generateInvoice } from "../utils/generateInvoice";
import uploadToCloudinary, { uploadPDFToCloudinary } from "../utils/cloudinaryUploader";
import { sendPushNotification } from "../utils/notificationSender";

const prisma = new PrismaClient();

function generateOrderCode() {
    return "ORD-" + crypto.randomBytes(4).toString("hex").toUpperCase();
  }

let subscriptionData  = [];
  
export const CreateOrder = async(req: Request,res: Response): Promise<any> => {
   try {

    const {name , note , orders , amount , isPack , paymentOption , restaurantId } = req.body;
    //@ts-ignore
    const { io } = req;
    if(!orders || !amount  || !paymentOption || (paymentOption != "Online" && paymentOption != "Cash") || !restaurantId){
        return res.status(402).json({
            success: false,
            message: "Missing data!"
        });
    }

    // console.log("suborderdata",orders)
    // const subOrders = JSON.parse(orders);
    const restaurantDetails = await prisma.restaurant.findUnique({
        where:{
            id: restaurantId
        }
    })

    const orderCode = generateOrderCode();
    const invoiceBuffer = await generateInvoice(req.body,orderCode,restaurantDetails);
    const invoiceRes:any = await uploadPDFToCloudinary(invoiceBuffer);
    console.log("Invoice Response",invoiceRes);
   await prisma.$transaction(async(prisma) => {
        let totalAmount = 0;
        //create order 
        const order = await prisma.order.create({
            data:{
                name:"",
                note,
                amount,
                isPack,
                paymentOption,
                restaurantId,
                orderCode,
                invoice:invoiceRes?.secure_url || null,
                isVerified: restaurantDetails ? restaurantDetails.autoAcceptOrder : false,
                createdAt: new Date( Date.now() ).toISOString()
            }
        });

        console.log("order",order)

        for(const subOrderData of orders){

            totalAmount += subOrderData.unitPrice;

            const t = await prisma.subOrder.create({
                data:{
                    name: subOrderData.name,
                    variant: subOrderData.variant,
                    productVariantId:subOrderData.productVariantId,
                    quantity: subOrderData.quantity,
                    unitPrice:  subOrderData.unitPrice,
                    orderId: order.id
                }
            })
         console.log("suborder",t)
        }



        //if calculated amount is not equal to provided amount
        // if(totalAmount !== amount){
        //     await prisma.order.update({
        //         data:{
        //             amount: totalAmount,
        //         },
        //         where:{
        //             id:order.id
        //         }
        //     })
        // }
        
        const orderRes = await prisma.order.findUnique({
            where:{
                id: order.id
            },
            include:{
                orders: true
            }
        });

        emitNewOrder(io,restaurantId,orderRes);

        return res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: order
        })

   });
    
    
   } catch (error) {
     console.log(error)
      return res.status(500).json({
            success: false,
            message: "Something wrong while creating order!"
      })
   }
}

// Verify order may be use later as a future scope
export const VerifyOrder = async(req: Request,res: Response): Promise<any> => {
    try {
        const { orderId } = req.body();

        const order = await prisma.order.findUnique({
            where:{
                id: orderId
            }
        })

        if(!order){
            return res.status(404).json({
                success: false,
                message: "Order is not found",
            });
        }

        const updatedOrder = await prisma.order.update({
            where:{
                id: orderId
            },
            data:{
                isVerified: true
            }
        });

        return res.status(200).json({
            success: true,
            message: "Order verified"
        })

    } catch (error) {
        console.log("Verify order error",error);
        return res.status(499).json({
            success: false,
            message: "Something wrong while verifying order"
        });
    }
}

export const UpdateStatus = async(req: Request,res: Response): Promise<any> => {
    try {
       
        const {status} = req.body;
        const { id } = req.params;
   
        if(!status || !id){
           return res.status(401).json({
               success: false,
               message: "Data missing"
           })
        }

        console.log("Id at update status",id);
        
        const order = await prisma.order.update({
           where:{
               id: id
           },
           data:{status}
        });
        console.log("Order",order)
        
        if(!order){
           return res.status(402).json({
               success: false,
               message: 'Something wrong , Try again!'
           })
        }
   
        let message;
        if(order.status == "Ready"){
            message = {
               title: "Your order is ready!",
               body: "Please pickup ur order at counter!!"
           }
        }
        if(order.status == "Cancelled"){
            message = {
               title: "Your order is cancelled!",
               body: "Sorry for this incovinence!!"
           }
        }
        if(order.status == "Completed"){
            message = {
               title: "Congratulation , you got ur food!",
               body: "Want to review us??"
           }
        }
   
        // if(message){
        //    await sendPushNotification(order.subscription,message);
        // }

        return res.status(200).json({
            success: true,
            message: "Status changed successfully"
        })

    } catch (error) {
        console.log("Something wrong while update status!",error)
        return res.status(499).json({
            success: false,
            message: "Something wrong while update status!"
        })
    }
}

export const GetAllOrders = async(req: Request,res: Response): Promise<any> => {
    try {
        
        const { restaurantId } = req.params;

        const orders = await prisma.order.findMany({
            where:{
                restaurantId: restaurantId
            },
            include:{
                orders: true
            }
        })

        return res.status(200).json({
            success: true,
            message: "All orders retrived",
            data: orders
        });

    } catch (error) {
        console.log("Get all orders error",error);
        return res.status(499).json({
            success: false,
            message: "Something wrong , while retriving all orders"
        })
    }
}

export const Subscribe = async(req: Request,res: Response): Promise<any> => {
    try {
        const { orderId , subscription } = req.body;
    subscriptionData[orderId] = subscription;
    const response = await prisma.order.update({
        where:{id: orderId},
        data: {subscription}
    })
    return res.status(200).json({
        success: true,
        message: "Subscription saved",
        data: response
    });
    } catch (error) {
        console.log("Error inside subscribe order",error);
        return res.status(499).json({
            success:false,
            message: "Subsrciption couldn't saved!"
        })
    }
}

export const NotifyCustomer = async(orderId: string, status: string,subscription: string) => {

  

}