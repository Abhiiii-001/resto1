import { Router } from "express";
import { CreateProduct, DeleteProduct, GetAllProducts, GetAllProductsByCategory, GetProductByQuery, UpdateProduct } from "../controllers/Product";
import { Auth } from "../middleware/Auth";

const router = Router();

router.post('/',Auth,CreateProduct);
router.put('/:productId',Auth,UpdateProduct);
router.delete('/:productId',Auth,DeleteProduct);
router.get("/",GetAllProducts);
router.get("/category",Auth,GetAllProductsByCategory)
router.get("/:search",Auth,GetProductByQuery);

export default router;