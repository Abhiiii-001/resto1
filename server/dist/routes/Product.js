"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = require("../controllers/Product");
const Auth_1 = require("../middleware/Auth");
const router = (0, express_1.Router)();
// Product variants routes
router.get('/variant', Auth_1.Auth, Product_1.GetAllProductVaraint);
router.post("/variant", Auth_1.Auth, Auth_1.IsModifier, Product_1.CreateProductVaraint);
router.put("/variant/:id", Auth_1.Auth, Auth_1.IsModifier, Product_1.UpdateProductVaraint);
router.delete("/variant/:id", Auth_1.Auth, Auth_1.IsModifier, Product_1.DeleteProductVaraint);
//Product routes
router.post('/', Auth_1.Auth, Auth_1.IsModifier, Product_1.CreateProduct);
router.put('/:productId', Auth_1.Auth, Auth_1.IsModifier, Product_1.UpdateProduct);
router.delete('/:productId', Auth_1.Auth, Auth_1.IsModifier, Product_1.DeleteProduct);
router.get("/category/:restaurantId", Auth_1.Auth, Product_1.GetAllProductsByCategory);
router.get("/:restaurantId", Product_1.GetAllProducts);
router.get("/:search", Auth_1.Auth, Product_1.GetProductByQuery);
exports.default = router;
