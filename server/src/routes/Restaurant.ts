import { Router } from "express";
import { GetAllRestaurants } from "../controllers/Restaurant";

const router = Router();
router.get("/all",GetAllRestaurants);

export default router;