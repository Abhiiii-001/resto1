import {Router} from 'express';
import { AddCategory, GetAllCategories, GetAllCategoriesWithProducts, RemoveCategory, UpdateCategory } from '../controllers/Category';
import {Auth, IsModifier} from '../middleware/Auth'

const router = Router();

router.post('/',Auth,IsModifier,AddCategory);
router.put("/:categoryId",Auth,IsModifier,UpdateCategory);
router.get("/",Auth,GetAllCategories);
router.get("/restaurant/:id",GetAllCategoriesWithProducts);
router.delete('/:categoryId',Auth,IsModifier,RemoveCategory);

export default router;
