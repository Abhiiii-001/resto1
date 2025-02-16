import { Router } from "express";
import { CreateOrder } from "../controllers/Order";

const router = Router();
router.post('/create-order',CreateOrder);

export default router;