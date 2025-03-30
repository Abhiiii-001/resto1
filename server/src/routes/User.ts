import { Router } from 'express'
import { CreateUser, DeleteUser, GetAllUsers, UpdateUser } from '../controllers/User';
import { Auth, IsRestaurant } from '../middleware/Auth';

const router = Router();

router.get('/:restaurantId',Auth,GetAllUsers);
router.put('/:userId',Auth,UpdateUser);
router.delete("/:userId",Auth,DeleteUser);
router.post('/:restaurantId',Auth,IsRestaurant,CreateUser)

export default router;