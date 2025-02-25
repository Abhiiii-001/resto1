import { Router } from "express";
import { GetAllRestaurants, GetRestaurantDetails } from "../controllers/Restaurant";

const router = Router();
router.get("/all",GetAllRestaurants);
router.get("/:id",GetRestaurantDetails)
export default router;