import { Router } from "express";
import { CreateProduct, CreateProductVaraint, DeleteProduct, DeleteProductVaraint, GetAllProducts, GetAllProductsByCategory, GetAllProductVaraint, GetProductByQuery, UpdateProduct, UpdateProductVaraint } from "../controllers/Product";
import { Auth } from "../middleware/Auth";

const router = Router();
// Product variants routes
router.get('/variant',Auth,GetAllProductVaraint);
router.post("/variant",Auth,CreateProductVaraint);
router.put("/variant/:id",Auth,UpdateProductVaraint);
router.delete("/variant/:id",Auth,DeleteProductVaraint);

//Product routes
router.post('/',Auth,CreateProduct);
router.put('/:productId',Auth,UpdateProduct);
router.delete('/:productId',Auth,DeleteProduct);
router.get("/",GetAllProducts);
router.get("/category",Auth,GetAllProductsByCategory)
router.get("/:search",Auth,GetProductByQuery);


export default router;