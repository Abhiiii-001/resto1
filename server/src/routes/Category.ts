import {Router} from 'express';
import { AddCategory, GetAllCategories, RemoveCategory, UpdateCategory } from '../controllers/Category';
import {Auth} from '../middleware/Auth'

const router = Router();

router.post('/',Auth,AddCategory);
router.put("/:categoryId",Auth,UpdateCategory);
router.get("/",Auth,GetAllCategories);
router.delete('/:categoryId',Auth,RemoveCategory);

export default router;