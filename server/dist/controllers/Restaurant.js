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
exports.DeleteRestaurant = exports.UpdateRestaurantDetails = exports.GetRestaurantDetails = exports.GetAllRestaurants = void 0;
const client_1 = require("@prisma/client");
const cloudinaryUploader_1 = __importDefault(require("../utils/cloudinaryUploader"));
const prisma = new client_1.PrismaClient();
const GetAllRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield prisma.restaurant.findMany({
            select: {
                id: true,
                name: true,
                resCode: true,
                thumbnail: true,
                slogan: true
            }
        });
        //console.log(restaurant);
        return res.status(200).json({ message: "Restaurants name fetched", restaurant: restaurant });
    }
    catch (error) {
        //console.log("Error during get all restaurants",error);
    }
});
exports.GetAllRestaurants = GetAllRestaurants;
const GetRestaurantDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantId = req.params.id;
        const restaurant = yield prisma.restaurant.findUnique({
            where: {
                id: restaurantId
            }
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Shop not found!",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Restaurant details fetched!",
            data: restaurant
        });
    }
    catch (error) {
        //console.log("Error during get restaurant details",error);
        return res.status(500).json({
            success: false,
            message: "Shop details didn't fetched!",
        });
    }
});
exports.GetRestaurantDetails = GetRestaurantDetails;
const UpdateRestaurantDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { restaurantId } = req.params;
        const data = req.body;
        const thumbnail = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail;
        if (!restaurantId || (!data && !thumbnail)) {
            return res.status(401).json({
                success: false,
                message: "Missing data!"
            });
        }
        // //console.log("data",data,thumbnail);
        // //console.log(restaurantId)
        const restaurant = yield prisma.restaurant.findUnique({
            where: {
                id: restaurantId,
                isActive: true
            },
            select: {
                id: true,
                thumbnail: true
            }
        });
        // //console.log("restaurant",restaurant);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found!"
            });
        }
        if (thumbnail) {
            const uploadRes = yield (0, cloudinaryUploader_1.default)(thumbnail, "my-files");
            data.thumbnail = uploadRes.secure_url;
            //console.log("Restaurant update thumbnail",data.thumbnail)
        }
        const updatedRestaurant = yield prisma.restaurant.update({
            where: {
                id: restaurantId,
                isActive: true
            },
            data: Object.assign({}, data)
        });
        //console.log("Updated restauarant",updatedRestaurant);
        return res.status(200).json({
            success: true,
            message: "Restaurant details updated!",
            data: updatedRestaurant
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something wrong!"
        });
    }
});
exports.UpdateRestaurantDetails = UpdateRestaurantDetails;
const DeleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        if (!restaurantId) {
            return res.status(401).json({
                success: "false",
                message: "Data missing!"
            });
        }
        yield prisma.restaurant.update({
            where: {
                id: restaurantId
            },
            data: {
                isActive: false
            }
        });
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "User deleted!"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
});
exports.DeleteRestaurant = DeleteRestaurant;
