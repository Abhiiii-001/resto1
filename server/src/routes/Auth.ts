import { Router } from "express";
import { ChangePassword, Login, Logout, ResetPassword, ResetPasswordMaker, RestaurantSignup, UserSignup, VerifyToken } from "../controllers/Auth";
import { Auth } from "../middleware/Auth";

const router = Router();

router.post('/user/signup', UserSignup)
router.post('/restaurant/signup',RestaurantSignup)
router.post('/login',Login);
router.post('/logout',Auth,Logout);
router.post('/verify-token',VerifyToken)
router.put('/change-password/:id',Auth,ChangePassword);
router.put('/reset-password',ResetPassword);
router.put('/reset-password/:verificationToken',ResetPasswordMaker);

export default router;
