import { Router } from 'express'
import { CreateUser, DeleteUser, GetAllUsers, GetUserDetailsById, UpdateUser } from '../controllers/User';
import { Auth, IsRestaurant } from '../middleware/Auth';
import { SubscriptionGuard } from "../middleware/SubscriptionGuard";
import { checkLimit } from "../middleware/FeatureLimit";

const router = Router();

router.get('/id/:userId',Auth,GetUserDetailsById);
router.get('/:restaurantId',Auth,GetAllUsers);
router.put('/:userId',Auth,UpdateUser);
router.delete("/:userId",Auth,DeleteUser);
router.post('/:restaurantId', Auth, IsRestaurant, SubscriptionGuard, checkLimit('employees'), CreateUser)

export default router;
