import { Router } from "express";
import { CreateOrder, GetAllOrders, Subscribe, UpdateStatus } from "../controllers/Order";
import { Auth } from "../middleware/Auth";

const router = Router();
router.post('/create-order',CreateOrder);
router.put('/subscribe',Subscribe);
router.put('/:id',Auth,UpdateStatus);
router.get('/:restaurantId',Auth,GetAllOrders);

export default router;