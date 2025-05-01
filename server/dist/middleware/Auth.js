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
exports.IsModifier = exports.IsAdmin = exports.IsUser = exports.IsRestaurant = exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const Auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.cookies.token ||
            req.body.token ||
            ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
        // console.log("cookie",req.cookies);
        // console.log("body",req.body);
        // console.log("headers",req.headers);
        if (!token)
            return res.status(401).json({ message: "Missing data" });
        const secret = process.env.JWT_SECRET || "secret";
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log(decoded); //id email role restaurantId
        //@ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(405).json({ message: "Authentication Failed!" });
    }
});
exports.Auth = Auth;
const IsRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.restaurant.findUnique({
            // @ts-ignore
            where: { email: req.user.email, isActive: true }
        });
        if (!user)
            return res.status(404).json({ message: "Unautorized Access!" });
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(405).json({ message: "Autorization Failed!" });
    }
});
exports.IsRestaurant = IsRestaurant;
const IsUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            //@ts-ignore
            where: { email: req.user.email }
        });
        if (!user || (user === null || user === void 0 ? void 0 : user.role) !== "User")
            return res.status(404).json({ message: "Unautorized Access!" });
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(405).json({ message: "Autorization Failed!" });
    }
});
exports.IsUser = IsUser;
const IsAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            //@ts-ignore
            where: { email: req.user.email }
        });
        if (!user || (user === null || user === void 0 ? void 0 : user.role) !== "Admin")
            return res.status(404).json({ message: "Unautorized Access!" });
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(405).json({ message: "Autorization Failed!" });
    }
});
exports.IsAdmin = IsAdmin;
const IsModifier = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        if (req.user.role == "User") {
            const user = yield prisma.user.findUnique({
                //@ts-ignore
                where: { email: req.user.email }
            });
            if (!user || !user.canModify) {
                return res.status(401).json({
                    success: false,
                    message: "Not authorized"
                });
            }
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(405).json({ message: "Autorization Failed!" });
    }
});
exports.IsModifier = IsModifier;
