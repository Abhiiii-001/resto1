"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductVaraint = exports.DeleteProductVaraint = exports.UpdateProductVaraint = exports.CreateProductVaraint = exports.GetAllProductsByCategory = exports.GetProductByQuery = exports.GetAllProducts = exports.DeleteProduct = exports.UpdateProduct = exports.CreateProduct = void 0;
const client_1 = require("@prisma/client");
const cloudinaryUploader_1 = __importDefault(require("../utils/cloudinaryUploader"));
const prisma = new client_1.PrismaClient;
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, categoryId, description, variants } = req.body;
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail;
        console.log("variants", variants);
        const productVariants = JSON.parse(variants);
        console.log("json variant", productVariants);
        console.log("Create product file", file);
        const fileUploadRes = yield (0, cloudinaryUploader_1.default)(file, "my-files");
        const productRes = yield prisma.product.create({
            data: {
                name: name,
                thumbnail: fileUploadRes.secure_url,
                categoryId: categoryId,
                description: description,
            },
            select: {
                id: true,
            }
        });
        try {
            productVariants.forEach((v) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield prisma.productVariant.create({
                    data: {
                        size: v.size,
                        price: parseInt(v === null || v === void 0 ? void 0 : v.price),
                        // salePrice:parseInt(v?.salePrice),
                        productId: productRes.id
                    },
                    select: {
                        id: true,
                    }
                });
            }));
        }
        catch (error) {
            yield prisma.product.delete({ where: { id: productRes.id } });
            return res.status(410).json({ message: "Failed to create product variants" });
        }
        return res.status(200).json({ productRes });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ message: "Something wrong during product creation!" });
    }
});
exports.CreateProduct = CreateProduct;
const UpdateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let productData = __rest(req.body, []);
        const file = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail) || null;
        const productId = req.params.productId;
        if (file) {
            const uploadRes = yield (0, cloudinaryUploader_1.default)(file, "my-files");
            productData.thumbnail = uploadRes.secure_url;
            console.log("Product update thumbnail", productData.thumbnail);
        }
        const result = yield prisma.product.update({
            where: {
                id: productId
            },
            data: productData,
            select: {
                id: true
            }
        });
        return res.status(200).json({
            result
        });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ message: "Something wrong during product updation!" });
    }
});
exports.UpdateProduct = UpdateProduct;
const DeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield prisma.product.delete({
            where: {
                id: productId
            }
        });
        return res.status(200).json({ messae: "Product deleted successfully!" });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ message: "Something wrong during product deletion!" });
    }
});
exports.DeleteProduct = DeleteProduct;
const GetAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const mostSelledProducts = await prisma.product.findMany({
        //     take: 10,
        //     orderBy:{
        //         sold:"desc"
        //     }
        // });
        //@ts-ignore
        const restaurantId = req.params.restaurantId;
        const allProducts = yield prisma.product.findMany({
            where: {
                category: {
                    restaurantId: restaurantId
                }
            },
            include: {
                productVariants: true,
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });
        // console.log(restaurantId,allProducts)
        // const popularProducts = await prisma.product.findMany({
        //     take:10,
        //     orderBy:{
        //         rating:"desc"
        //     }
        // });
        return res.status(200).json({
            message: "Product fetched!",
            products: allProducts,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ message: "Something wrong during product retreive!" });
    }
});
exports.GetAllProducts = GetAllProducts;
const GetProductByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, restaurantId } = req.params;
        const products = yield prisma.product.findMany({
            where: {
                name: {
                    contains: search
                },
                category: {
                    restaurantId: restaurantId
                }
            }
        });
        return res.status(200).json({
            products: products
        });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ message: "Something wrong during product retrieve!" });
    }
});
exports.GetProductByQuery = GetProductByQuery;
const GetAllProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        const products = yield prisma.category.findMany({
            where: {
                restaurantId: restaurantId,
            },
            include: {
                products: true
            }
        });
        return res.status(200).json({
            message: "Product fetched successfully!",
            products: products
        });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ message: "Something wrong during product retrieve!" });
    }
});
exports.GetAllProductsByCategory = GetAllProductsByCategory;
const CreateProductVaraint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { size, price, salePrice, productId } = req.body;
        if (!size || !price || !productId)
            return res.status(401).json({ message: "All fields are required" });
        const result = yield prisma.productVariant.create({
            data: {
                size,
                price,
                salePrice,
                productId
            },
            select: {
                id: true,
            }
        });
        return res.status(200).json({ result });
    }
    catch (error) {
        console.log("Error while create product variants", error);
    }
});
exports.CreateProductVaraint = CreateProductVaraint;
const UpdateProductVaraint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = __rest(req.body, []);
        const { id } = req.params;
        console.log(updatedData);
        console.log(id);
        const result = yield prisma.productVariant.update({
            where: {
                id: id
            },
            data: updatedData,
            select: {
                id: true
            }
        });
        return res.status(200).json({ result });
    }
    catch (error) {
        console.log("Error while update product variants", error);
    }
});
exports.UpdateProductVaraint = UpdateProductVaraint;
const DeleteProductVaraint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.productVariant.delete({
            where: {
                id: id
            }
        });
        return res.status(200).json({ message: "Product variant deleted!" });
    }
    catch (error) {
        console.log("Error while delete product variants", error);
    }
});
exports.DeleteProductVaraint = DeleteProductVaraint;
const GetAllProductVaraint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.productVariant.findMany({});
        return res.status(200).json({ result });
    }
    catch (error) {
        console.log("Error while fetching product variants", error);
    }
});
exports.GetAllProductVaraint = GetAllProductVaraint;
