import express from "express";
import { Auth, IsRestaurant } from "../middleware/Auth";
import {
  getPlans,
  getCurrentSubscription,
  createPaymentOrder,
  verifyPaymentStatus,
  handlePaymentCallback,
  cancelSubscription,
  getPaymentHistory,
  downloadInvoice,
  previewSubscriptionChange
} from "../controllers/Subscription";

const router = express.Router();

router.get("/plans", getPlans);
router.get("/current", Auth, IsRestaurant, getCurrentSubscription);
router.post("/create-order", Auth, IsRestaurant, createPaymentOrder);
router.post("/preview-change", Auth, IsRestaurant, previewSubscriptionChange);
router.post("/verify-payment", Auth, IsRestaurant, verifyPaymentStatus);
router.post("/payment/callback", handlePaymentCallback); // Public callback
router.post("/cancel", Auth, IsRestaurant, cancelSubscription);
router.get("/history", Auth, IsRestaurant, getPaymentHistory);
router.get("/invoice/:paymentId", Auth, IsRestaurant, downloadInvoice);

export default router;
