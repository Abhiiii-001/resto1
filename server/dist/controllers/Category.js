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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategoriesWithProducts = exports.GetAllCategories = exports.UpdateCategory = exports.RemoveCategory = exports.AddCategory = void 0;
const client_1 = require("@prisma/client");
const cloudinaryUploader_1 = __importDefault(require("../utils/cloudinaryUploader"));
const prisma = new client_1.PrismaClient();
const AddCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //Get all requried data
        const { name } = req.body;
        const thumbnail = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail;
        //console.log(name,thumbnail);
        //@ts-ignore
        const restaurantId = req.user.restaurantId;
        //check if anyone is null
        if (!name || !restaurantId || !thumbnail)
            return res.status(402).json({ message: "All fields requried!" });
        //update thumbanil to cloudinary
        const uploadFileRes = yield (0, cloudinaryUploader_1.default)(thumbnail, "my-files");
        const currentTime = new Date(Date.now()).toISOString();
        //create entry
        const result = yield prisma.category.create({
            data: {
                name: name,
                thumbnail: uploadFileRes === null || uploadFileRes === void 0 ? void 0 : uploadFileRes.secure_url,
                restaurantId: restaurantId,
                createdAt: currentTime
            }
        });
        return res.status(200).json({ message: "Category created!" });
    }
    catch (error) {
        //console.log(error);
        return res.status(500).json({ message: "Something wrong during category creation!" });
    }
});
exports.AddCategory = AddCategory;
const RemoveCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        if (!categoryId)
            return res.status(402).json({ message: "Empty category id" });
        const categoryRes = yield prisma.category.delete({
            where: {
                id: categoryId
            }
        });
        return res.status(200).json({ message: "Category deleted!" });
    }
    catch (error) {
        //console.log(error);
        return res.status(500).json({ message: "Something wrong during category deletion!" });
    }
});
exports.RemoveCategory = RemoveCategory;
const UpdateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let updatedData = req.body;
        const thumbanil = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbanil;
        const { categoryId } = req.params;
        if (thumbanil) {
            const thumbnailUploadRes = yield (0, cloudinaryUploader_1.default)(thumbanil, "my-files");
            updatedData.thumbanil = thumbnailUploadRes === null || thumbnailUploadRes === void 0 ? void 0 : thumbnailUploadRes.secure_url;
        }
        console.log('debug-cate', thumbanil, updatedData);
        const result = yield prisma.category.update({
            where: {
                id: categoryId
            },
            data: updatedData
        });
        return res.status(200).json({ message: "Category updated!", result: result });
    }
    catch (error) {
        //console.log(error);
        return res.status(500).json({ message: "Something wrong during category updation!" });
    }
});
exports.UpdateCategory = UpdateCategory;
const GetAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const restaurantId = req.user.restaurantId;
        const categories = yield prisma.category.findMany({
            where: {
                restaurantId: restaurantId
            },
            select: {
                name: true,
                id: true,
                thumbnail: true
            }
        });
        return res.status(200).json({ categories });
    }
    catch (error) {
        //console.log(error);
        return res.status(500).json({ message: "Something wrong during category retrive!" });
    }
});
exports.GetAllCategories = GetAllCategories;
const GetAllCategoriesWithProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const restaurantId = req.params.id;
        const categories = yield prisma.category.findMany({
            where: {
                restaurantId: restaurantId
            },
            select: {
                name: true,
                id: true,
                thumbnail: true,
                products: {
                    include: {
                        productVariants: true
                    }
                }
            },
        });
        return res.status(200).json({
            success: false,
            message: "All category retrived successfully",
            data: categories
        });
    }
    catch (error) {
        //console.log("Get all categories with product error",error);
        return res.status(500).json({
            success: false,
            message: "Something wrong during all data retrieve"
        });
    }
});
exports.GetAllCategoriesWithProducts = GetAllCategoriesWithProducts;
