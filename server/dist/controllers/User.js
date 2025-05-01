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
exports.GetUserDetailsById = exports.CreateUser = exports.DeleteUser = exports.UpdateUser = exports.GetAllUsers = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantId = req.params.restaurantId;
        const users = yield prisma.user.findMany({
            where: {
                restaurantId: restaurantId
            }
        });
        return res.status(200).json({ success: true, message: "All user fetched successfully!", users: users });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ success: false, message: "Something wrong during user fetching!" });
    }
});
exports.GetAllUsers = GetAllUsers;
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const user = yield prisma.user.update({
            where: { id: userId },
            data: updatedData
        });
        if (!user)
            return res.status(404).json({ success: false, message: "User not found!" });
        return res.status(200).json({ success: true, message: "User updated!", data: user });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ succcess: false, message: "Something wrong during user updating!" });
    }
});
exports.UpdateUser = UpdateUser;
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield prisma.user.delete({
            where: {
                id: userId
            }
        });
        if (!user)
            return res.status(404).json({ success: false, message: "User not found" });
        return res.status(200).json({ success: true, message: "User deleted!" });
    }
    catch (error) {
        console.log(error);
        return res.status(499).json({ success: false, message: "Something wrong during user deleting!" });
    }
});
exports.DeleteUser = DeleteUser;
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, number, email, role } = req.body;
        const { restaurantId } = req.params;
        if (!name || !number || !email) {
            return res.status(401).json({
                success: false,
                message: "All field required!"
            });
        }
        const existingUser = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        const existingRestraurant = yield prisma.restaurant.findUnique({
            where: { email }
        });
        if (existingRestraurant || existingUser) {
            return res.status(403).json({
                success: false,
                message: "Email is already registered!"
            });
        }
        const defaultPassword = "123456";
        const hashedPassword = (yield bcrypt_1.default.hash(defaultPassword, 10)).toString();
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                number,
                restaurantId,
                canModify: false,
                role,
                verificationToken: "",
                isVerified: true
            }
        });
        return res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: user
        });
    }
    catch (error) {
        return res.status(499).json({
            success: false,
            message: "Something wrong while user creation"
        });
    }
});
exports.CreateUser = CreateUser;
const GetUserDetailsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Data missing!"
            });
        }
        const userDetails = yield prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: false,
            message: 'User data fetched successfully',
            data: userDetails
        });
    }
    catch (error) {
        return res.status(499).json({
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message
        });
    }
});
exports.GetUserDetailsById = GetUserDetailsById;
