import {Router} from 'express';
import { AddCategory, GetAllCategories, GetAllCategoriesWithProducts, RemoveCategory, UpdateCategory } from '../controllers/Category';
import {Auth, IsModifier} from '../middleware/Auth'
import { SubscriptionGuard } from "../middleware/SubscriptionGuard";
import { checkLimit } from "../middleware/FeatureLimit";

const router = Router();

router.post('/', Auth, IsModifier, SubscriptionGuard, checkLimit('categories'), AddCategory);
router.put("/:categoryId",Auth,IsModifier,UpdateCategory);
router.get("/",Auth,GetAllCategories);
router.get("/restaurant/:id",GetAllCategoriesWithProducts);
router.delete('/:categoryId',Auth,IsModifier,RemoveCategory);

export default router;
