import { Router } from "express";
import { RestaurantSignup, UserSignup } from "../controllers/Auth";

const router = Router();

router.post('/user/signup', UserSignup)
router.post('/restaurant/signup',RestaurantSignup)

export default router;