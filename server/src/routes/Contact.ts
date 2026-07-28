import { Router } from "express";
import { ContactUs } from "../controllers/Contact";

const router = Router();

router.post("/", ContactUs);

export default router;
