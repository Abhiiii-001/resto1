import {Router} from 'express';
import { AddCategory, GetAllCategories, GetAllCategoriesWithProducts, RemoveCategory, UpdateCategory } from '../controllers/Category';
import {Auth} from '../middleware/Auth'

const router = Router();

router.post('/',Auth,AddCategory);
router.put("/:categoryId",Auth,UpdateCategory);
router.get("/",Auth,GetAllCategories);
router.get("/restaurant/:id",GetAllCategoriesWithProducts);
router.delete('/:categoryId',Auth,RemoveCategory);

export default router;