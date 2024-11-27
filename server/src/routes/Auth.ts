import { Router } from "express";
import { Login, Logout, RestaurantSignup, UserSignup } from "../controllers/Auth";

const router = Router();

router.post('/user/signup', UserSignup)
router.post('/restaurant/signup',RestaurantSignup)
router.post('/login',Login);
router.post('/logout',Logout);

export default router;