import { Router } from "express";
import { CreateProduct, CreateProductVaraint, DeleteProduct, DeleteProductVaraint, GetAllProducts, GetAllProductsByCategory, GetAllProductVaraint, GetProductByQuery, UpdateProduct, UpdateProductVaraint } from "../controllers/Product";
import { Auth, IsModifier } from "../middleware/Auth";

const router = Router();
// Product variants routes
router.get('/variant',Auth,GetAllProductVaraint);
router.post("/variant",Auth,IsModifier,CreateProductVaraint);
router.put("/variant/:id",Auth,IsModifier,UpdateProductVaraint);
router.delete("/variant/:id",Auth,IsModifier,DeleteProductVaraint);

//Product routes
router.post('/',Auth,IsModifier,CreateProduct);
router.put('/:productId',Auth,IsModifier,UpdateProduct);
router.delete('/:productId',Auth,IsModifier,DeleteProduct);
router.get("/category/:restaurantId",Auth,GetAllProductsByCategory)
router.get("/:restaurantId",GetAllProducts);
router.get("/:search",Auth,GetProductByQuery);


export default router;