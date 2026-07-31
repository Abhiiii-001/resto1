import { Router } from "express";
import { DeleteRestaurant, GetAllRestaurants, GetCustomerRestaurantDetails, GetRestaurantDetails, RaiseApprovalForPublish, UpdateRestaurantDetails } from "../controllers/Restaurant";
import { Auth, IsRestaurant, IsRestaurantOrUser } from "../middleware/Auth";

const router = Router();

router.get("/all", GetAllRestaurants);
router.get("/:id", Auth, IsRestaurant, GetRestaurantDetails)
router.get('/customer/:id', GetCustomerRestaurantDetails)
router.put('/delete/:restaurantId', Auth, IsRestaurant, DeleteRestaurant);
router.put('/:restaurantId', Auth, IsRestaurant, UpdateRestaurantDetails);
router.put('/raise-approval/:restaurantId', Auth, IsRestaurant, RaiseApprovalForPublish)

export default router;
