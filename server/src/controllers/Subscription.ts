import { Request, Response } from "express";
import crypto from 'crypto';
import { PrismaClient } from "@prisma/client";
import { SUBSCRIPTION_STATUS, PLAN_TYPE, PAYMENT_TYPE, PAYMENT_STATUS } from "../constants";
import { initiatePhonePePayment, verifyPhonePePayment, verifyPhonePeChecksum } from "../utils/phonepe";
import { generateSubscriptionInvoicePDF } from "../utils/pdfGenerator";

const prisma = new PrismaClient();

export const getPlans = async (req: Request, res: Response): Promise<any> => {
  try {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' },
    });
    return res.status(200).json({ success: true, plans });
  } catch (error) {
    console.error("getPlans Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCurrentSubscription = async (req: Request, res: Response): Promise<any> => {
  try {
    const restaurantId = req.user?.restaurantId || req.user?.id;
    if (!restaurantId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const subscription = await prisma.subscription.findFirst({
      where: { restaurantId },
      include: { plan: true },
    });

    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    console.error("getCurrentSubscription Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createPaymentOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { planId } = req.body;
    const restaurantId = req.user?.restaurantId || req.user?.id;
    if (!restaurantId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });
     const transactionId = "TXN" + Date.now() + crypto.randomBytes(4).toString('hex');

    // Handle Free Plan (Price 0)
    if (plan.price === 0) {
      // Check if user has already used a plan (prevents multiple demos)
      const existingSub = await prisma.subscription.findFirst({
        where: { restaurantId }
      });

      if (existingSub) {
        return res.status(400).json({ 
          success: false, 
          message: "You have already used your trial/plan. Please upgrade to a paid plan." 
        });
      }

      const now = new Date();
      const currentPeriodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

      // Update/Create Subscription directly
      const subscription = await prisma.subscription.upsert({
        where: { restaurantId },
        update: {
          planId: plan.id,
          status: SUBSCRIPTION_STATUS.ACTIVE,
          currentPeriodStart: now,
          currentPeriodEnd: currentPeriodEnd,
          trialEndsAt: null,
        },
        create: {
          restaurantId,
          planId: plan.id,
          status: SUBSCRIPTION_STATUS.ACTIVE,
          currentPeriodStart: now,
          currentPeriodEnd: currentPeriodEnd,
        }
      });

      // Create a captured payment record for the free plan
      await prisma.payment.create({
        data: {
          amount: 0,
          paymentType: PAYMENT_TYPE.SUBSCRIPTION,
          status: PAYMENT_STATUS.CAPTURED,
          gateway: "free",
          gatewayOrderId: transactionId,
          restaurantId,
          subscriptionId: subscription.id,
          metadata: { planId }
        }
      });

      return res.status(200).json({ 
        success: true, 
        message: "Free plan activated successfully",
        redirectUrl: `${process.env.CLIENT_URL}/dashboard/subscription`
      });
    }

    // Initiate PhonePe Payment (for paid plans)
    const phonepeRes = await initiatePhonePePayment(
      transactionId,
      plan.price * 100, // Amount in paise
      `${process.env.CLIENT_URL}/dashboard/subscription/verify?txnId=${transactionId}&planId=${planId}`
    );
    
    console.log('Phonepay response', JSON.stringify(phonepeRes, null, 2));
    
    if (!phonepeRes.success) {
      console.error("PhonePe Initiation Failed. Full Detail:", {
        transactionId,
        amount: plan.price * 100,
        response: phonepeRes
      });
      return res.status(400).json({ 
        success: false, 
        message: "Failed to initiate payment",
        detail: phonepeRes // Sending this to help you debug
      });
    }

    // Create a pending payment record
    const payment = await prisma.payment.create({
      data: {
        amount: plan.price,
        paymentType: PAYMENT_TYPE.SUBSCRIPTION,
        status: PAYMENT_STATUS.PENDING,
        gateway: "phonepe",
        gatewayOrderId: transactionId,
        restaurantId,
        metadata: { planId }
      }
    });

    return res.status(200).json({ 
      success: true, 
      redirectUrl: phonepeRes.data?.instrumentResponse.redirectInfo.url,
      paymentId: payment.id,
      transactionId
    });
  } catch (error) {
    console.error("createPaymentOrder Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const verifyPaymentStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { transactionId, planId } = req.body;
    const restaurantId = req.user?.restaurantId || req.user?.id;
    if (!restaurantId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const phonepeRes = await verifyPhonePePayment(transactionId);
    
    if (!phonepeRes.success || phonepeRes.code !== "PAYMENT_SUCCESS") {
      return res.status(400).json({ success: false, message: "Payment not successful", code: phonepeRes.code });
    }

    const payment = await prisma.payment.findFirst({
       where: { gatewayOrderId: transactionId, restaurantId }
    });

    if (!payment || payment.status === PAYMENT_STATUS.CAPTURED) {
       return res.status(200).json({ success: true, message: "Payment already processed" });
    }

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

    // Payment is valid, update subscription
    const now = new Date();
    const currentPeriodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    // Find existing subscription
    let subscription = await prisma.subscription.findFirst({
      where: { restaurantId }
    });

    if (subscription) {
       subscription = await prisma.subscription.update({
         where: { id: subscription.id },
         data: {
           planId: plan.id,
           status: SUBSCRIPTION_STATUS.ACTIVE,
           currentPeriodStart: now,
           currentPeriodEnd: currentPeriodEnd,
           trialEndsAt: null, // clear trial
         }
       });
    } else {
       subscription = await prisma.subscription.create({
         data: {
           restaurantId,
           planId: plan.id,
           status: SUBSCRIPTION_STATUS.ACTIVE,
           currentPeriodStart: now,
           currentPeriodEnd: currentPeriodEnd,
         }
       });
    }

    // Mark payment as captured
    await prisma.payment.update({
      where: { id: payment.id },
      data: { 
        status: PAYMENT_STATUS.CAPTURED, 
        gatewayPaymentId: phonepeRes.data.transactionId,
        subscriptionId: subscription.id
      }
    });

    return res.status(200).json({ success: true, message: "Subscription activated successfully" });
  } catch (error) {
    console.error("verifyPaymentStatus Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const handlePaymentCallback = async (req: Request, res: Response): Promise<any> => {
  try {
    const { request, response, data: reqData } = req.body; 

    // 1. Handle PhonePe Webhook Validation Request
    if (reqData === 'WEBHOOK_VALIDATION_SUCCESS') {
      console.log("PhonePe Webhook Validation Successful");
      return res.status(200).send("OK");
    }

    const base64Payload = request || response;
    // Check both x-verify and authorization headers
    const checksum = (req.headers["x-verify"] || req.headers["authorization"]) as string;

    console.log('payment-callback', { base64Payload, checksum, body: req.body });

    if (!base64Payload || !checksum) {
      console.error("Missing payload or checksum in PhonePe callback");
      return res.status(400).json({ success: false, message: "Invalid callback payload" });
    }

    const isValid = verifyPhonePeChecksum(base64Payload, checksum);
    if (!isValid) {
      console.error("PhonePe Callback Checksum Verification Failed");
      return res.status(401).json({ success: false, message: "Invalid signature" });
    }

    // Decode response
    const decodedPayload = JSON.parse(Buffer.from(base64Payload, "base64").toString("utf-8"));
    const { success, code, data } = decodedPayload;

    const transactionId = data.merchantTransactionId;
    
    if (success && code === "PAYMENT_SUCCESS") {
       // Find the payment record
       const payment = await prisma.payment.findFirst({
         where: { gatewayOrderId: transactionId },
         include: { restaurant: true }
       });

       if (payment && payment.status !== PAYMENT_STATUS.CAPTURED) {
         const planId = (payment.metadata as any)?.planId;
         const plan = await prisma.plan.findUnique({ where: { id: planId } });

         if (plan) {
            const now = new Date();
            const currentPeriodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

            // Update/Create Subscription
            const subscription = await prisma.subscription.upsert({
              where: { restaurantId: payment.restaurantId },
              update: {
                planId: plan.id,
                status: SUBSCRIPTION_STATUS.ACTIVE,
                currentPeriodStart: now,
                currentPeriodEnd: currentPeriodEnd,
              },
              create: {
                restaurantId: payment.restaurantId,
                planId: plan.id,
                status: SUBSCRIPTION_STATUS.ACTIVE,
                currentPeriodStart: now,
                currentPeriodEnd: currentPeriodEnd,
              }
            });

            // Update Payment
            await prisma.payment.update({
              where: { id: payment.id },
              data: {
                status: PAYMENT_STATUS.CAPTURED,
                gatewayPaymentId: data.transactionId,
                subscriptionId: subscription.id
              }
            });
         }
       }
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error("handlePaymentCallback Error:", error);
    return res.status(500).send("Error");
  }
};

export const cancelSubscription = async (req: Request, res: Response): Promise<any> => {
  try {
    const restaurantId = req.user?.restaurantId || req.user?.id;
    if (!restaurantId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const subscription = await prisma.subscription.findFirst({
      where: { restaurantId }
    });

    if (!subscription) {
       return res.status(404).json({ success: false, message: "Subscription not found" });
    }

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        cancelledAt: new Date()
        // status remains ACTIVE until currentPeriodEnd via cron
      }
    });

    return res.status(200).json({ success: true, message: "Subscription cancelled successfully" });
  } catch (error) {
    console.error("cancelSubscription Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getPaymentHistory = async (req: Request, res: Response): Promise<any> => {
  try {
    const restaurantId = req.user?.restaurantId || req.user?.id;
    if (!restaurantId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const payments = await prisma.payment.findMany({
      where: { 
        restaurantId,
        paymentType: PAYMENT_TYPE.SUBSCRIPTION
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("getPaymentHistory Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const downloadInvoice = async (req: Request, res: Response): Promise<any> => {
  try {
    const { paymentId } = req.params;
    const restaurantId = req.user?.restaurantId || req.user?.id;

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { 
        restaurant: true,
        subscription: {
          include: { plan: true }
        }
      }
    });

    if (!payment || payment.restaurantId !== restaurantId) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    const filename = `Invoice_${payment.gatewayOrderId}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    generateSubscriptionInvoicePDF(payment, res);

  } catch (error) {
    console.error("downloadInvoice Error:", error);
    if (!res.headersSent) {
       res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};
