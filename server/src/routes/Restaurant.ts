import { Router } from "express";
import { DeleteRestaurant, GetAllRestaurants, GetRestaurantDetails, UpdateRestaurantDetails } from "../controllers/Restaurant";
import { Auth, IsRestaurant } from "../middleware/Auth";

const router = Router();

router.get("/all",GetAllRestaurants);
router.get("/:id",GetRestaurantDetails)
router.put('/delete/:restaurantId',Auth,IsRestaurant,DeleteRestaurant);
router.put('/:restaurantId',Auth,IsRestaurant,UpdateRestaurantDetails);

export default router;
