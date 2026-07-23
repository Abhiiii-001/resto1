import { Request, Response } from "express";
import fs from 'fs'
import crypto from "crypto";
import { Server } from "socket.io"
import { emitNewOrder } from "../socket";
import { generateInvoice } from "../utils/generateInvoice";
import uploadToCloudinary, { uploadPDFToCloudinary } from "../utils/cloudinaryUploader";
import { sendPushNotification } from "../utils/notificationSender";
import { SUBSCRIPTION_STATUS } from "../constants";
import prisma from "../config/prisma";

function generateOrderCode() {
    return "ORD-" + crypto.randomBytes(4).toString("hex").toUpperCase();
  }

  
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

    // //console.log("suborderdata",orders)
    // const subOrders = JSON.parse(orders);
    const restaurantDetails = await prisma.restaurant.findUnique({
        where:{
            id: restaurantId
        },
        include: {
            subscription: true
        }
    });

    if (restaurantDetails?.subscription) {
        const sub = restaurantDetails.subscription;
        const now = new Date();
        if (sub.status !== SUBSCRIPTION_STATUS.ACTIVE || now > sub.currentPeriodEnd) {
            return res.status(402).json({
                success: false,
                message: "Restaurant subscription is currently inactive. Order placement is temporarily disabled.",
                code: "RESTAURANT_INACTIVE"
            });
        }
    }

    const orderCode = generateOrderCode();
    const invoiceBuffer = await generateInvoice(req.body,orderCode,restaurantDetails);
    const invoiceRes:any = await uploadPDFToCloudinary(invoiceBuffer);
    //console.log("Invoice Response",invoiceRes);
   await prisma.$transaction(async(prisma) => {
        let totalAmount = 0;
        //create order 
        const order = await prisma.order.create({
            data:{
                name: name || "Guest",
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

        //console.log("order",order)

        for(const subOrderData of orders){

            totalAmount += subOrderData.unitPrice;

            prisma.productVariant.update({
                where:{
                    id: subOrderData.productVariantId
                },
                data:{
                    sold:{
                        increment:subOrderData.quantity
                    }
                }
            });

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
         //console.log("suborder",t)
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
            data: orderRes
        })

   });
    
    
   } catch (error) {
     //console.log(error)
      return res.status(500).json({
            success: false,
            message: "Something wrong while creating order!"
      })
   }
}

// Verify order may be use later as a future scope
export const VerifyOrder = async(req: Request,res: Response): Promise<any> => {
    try {
        const { orderId } = req.body;

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
        //console.log("Verify order error",error);
        return res.status(500).json({
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

        const order = await prisma.order.update({
           where:{
               id: id
           },
           data:{status}
        });
        
        if(!order){
           return res.status(402).json({
               success: false,
               message: 'Something went wrong, Try again!'
           })
        }
   
        // Industry Standard: Handle notifications for all status updates
        if (order.subscription) {
            await NotifyCustomer(order.subscription, status, order.orderCode);
        }

        return res.status(200).json({
            success: true,
            message: "Status updated and customer notified"
        })

    } catch (error) {
        console.error("Error in UpdateStatus:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating status"
        })
    }
}

export const GetAllOrders = async(req: Request,res: Response): Promise<any> => {
    try {
        
        const { restaurantId } = req.params;

        // Fetch subscription to check orderHistory limit
        const subscription = await prisma.subscription.findFirst({
            where: { restaurantId },
            include: { plan: true },
        });

        const orderHistoryDays = subscription?.plan?.orderHistory ?? -1;

        // Build date filter: if orderHistory > 0, only return orders within that window
        const dateFilter: any = {};
        if (orderHistoryDays > 0) {
            const cutoffDate = new Date(Date.now() - orderHistoryDays * 24 * 60 * 60 * 1000);
            dateFilter.createdAt = { gte: cutoffDate.toISOString() };
        }

        const orders = await prisma.order.findMany({
            where:{
                restaurantId,
                ...dateFilter,
            },
            include:{
                orders: true
            }
        })

        return res.status(200).json({
            success: true,
            message: "All orders retrived",
            data: orders,
            ...(orderHistoryDays > 0 && { orderHistoryDays }),
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something wrong , while retriving all orders"
        })
    }
}

  
export const Subscribe = async(req: Request,res: Response): Promise<any> => {
    try {
        const { orderId , subscription } = req.body;

        if (!orderId || !subscription) {
            return res.status(400).json({
                success: false,
                message: "OrderId and Subscription are required"
            });
        }
        // Industry Standard: Store the subscription as a string in the DB
        const subscriptionString = typeof subscription === 'string' ? subscription : JSON.stringify(subscription);

        const response = await prisma.order.update({
            where: { id: orderId },
            data: { subscription: subscriptionString }
        })

        return res.status(200).json({
            success: true,
            message: "Subscription saved",
            data: response
        });
    } catch (error) {
        console.error("Error inside subscribe order:", error);
        return res.status(500).json({ // Changed from 499 to 500 for better standards
            success: false,
            message: "Subscription couldn't be saved!"
        })
    }
}

export const NotifyCustomer = async(subscription: string, status: string, orderCode: string) => {
    try {
        const notificationMessages: Record<string, { title: string, body: string }> = {
            "Confirmed": {
                title: "Order Confirmed!",
                body: `Your order ${orderCode} has been confirmed and is being prepared.`
            },
            "Preparing": {
                title: "Preparing your food!",
                body: "Our chefs are working their magic on your order."
            },
            "Ready": {
                title: "Order Ready!",
                body: "Your order is ready for pickup! Please head to the counter."
            },
            "Cancelled": {
                title: "Order Cancelled",
                body: "We're sorry, but your order has been cancelled. Please contact the counter for details."
            },
            "Completed": {
                title: "Enjoy your meal!",
                body: "Thank you for dining with us. We hope to see you again soon!"
            }
        };

        const message = notificationMessages[status];
        if (message && subscription) {
            const subObject = typeof subscription === 'string' ? JSON.parse(subscription) : subscription;
            await sendPushNotification(subObject, message);
        }
    } catch (error) {
        console.error("Error in NotifyCustomer utility:", error);
    }
}
