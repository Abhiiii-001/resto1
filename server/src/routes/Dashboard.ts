import { Router } from 'express'
import { GetDashboardData } from '../controllers/Dashboard';
import { Auth, IsRestaurant } from '../middleware/Auth';

const router = Router();

router.get('/:restaurantId', Auth, IsRestaurant, GetDashboardData);

export default router;
