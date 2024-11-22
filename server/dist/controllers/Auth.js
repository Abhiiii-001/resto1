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
exports.Logout = exports.Login = exports.RestaurantSignup = exports.UserSignup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailSender_1 = __importDefault(require("../utils/mailSender"));
const cloudinaryUploader_1 = __importDefault(require("../utils/cloudinaryUploader"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
;
const prisma = new client_1.PrismaClient({
    datasources: {
        db: { url: process.env.DATABASE_URL },
    },
});
//  *************** SIGNUP ENDPOINTS  *****************
const UserSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqData = req.body;
        const { email, password, name, number, canModify = false, restaurantId } = reqData;
        const existingUser = yield prisma.user.findFirst({
            where: { email }
        });
        const existingRestraurant = yield prisma.restaurant.findUnique({
            where: { email }
        });
        if (existingRestraurant || existingUser) {
            return res.status(401).json({ message: "Email Already Taken!" });
        }
        const restaurant = yield prisma.restaurant.findUnique({
            where: {
                id: restaurantId
            }
        });
        if (!restaurant) {
            return res.status(401).json({ message: "Restaurant Id is not correct" });
        }
        const hashedPassword = (yield bcrypt_1.default.hash(password, 10)).toString();
        const verificationToken = crypto.randomUUID().toString();
        const user = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                number,
                canModify,
                restaurantId: restaurantId,
                verificationToken
            }
        });
        if (!user)
            return res.status(500).json({ message: "Something wrong while user creation!" });
        const verificationLink = `${process.env.CLIET_URL}/verify?token=${verificationToken}`;
        const mailResponse = yield (0, mailSender_1.default)(restaurant.email, "Verify User", `<p>Click <a href="${verificationLink}">here</a> to verify employee email.</p>`);
        res.status(200).json({
            message: "User created! , Waiting for verification by Restaurant",
            user: user,
            mailResponse: mailResponse === null || mailResponse === void 0 ? void 0 : mailResponse.response
        });
    }
    catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({ message: "Signup Failed!" });
    }
});
exports.UserSignup = UserSignup;
const RestaurantSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqData = req.body;
        console.log(reqData);
        const { name, slogan, number, address, email, password, } = reqData;
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail;
        console.log(file);
        const existingUser = yield prisma.user.findUnique({
            where: { email }
        });
        const existingRestraurant = yield prisma.restaurant.findUnique({
            where: { email }
        });
        if (existingRestraurant || existingUser) {
            return res.status(401).json({ message: "Email Already Taken!" });
        }
        const thumbnailUploadRes = yield (0, cloudinaryUploader_1.default)(file, 'my-files');
        console.log("UPLOAD FILE RESPONSE : ", thumbnailUploadRes);
        // fs.unlinkSync(file.tempFilePath); 
        const hashedPassword = (yield bcrypt_1.default.hash(password, 10)).toString();
        const verificationToken = crypto.randomUUID().toString();
        console.log("verification token", verificationToken);
        const parsedNumber = parseInt(number);
        const restaurant = yield prisma.restaurant.create({
            data: {
                name,
                slogan,
                thumbnail: thumbnailUploadRes.secure_url,
                number: parsedNumber,
                address,
                email,
                password: hashedPassword,
            }
        });
        console.log(restaurant);
        if (!restaurant)
            return res.status(500).json({ message: "Something wrong while user creation!" });
        const verificationLink = `${process.env.CLIET_URL}/verify?token=${verificationToken}`;
        const mailResponse = yield (0, mailSender_1.default)(email, "Verify User", `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`);
        res.status(200).json({
            message: "User created! , Waiting for verification",
            user: restaurant,
            mailResponse: mailResponse === null || mailResponse === void 0 ? void 0 : mailResponse.response
        });
    }
    catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({ message: "Signup Failed!" });
    }
});
exports.RestaurantSignup = RestaurantSignup;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({ message: "All field are required!" });
        }
        const user = yield prisma.restaurant.findUnique({
            where: { email }
        });
        let restaurantId = user === null || user === void 0 ? void 0 : user.id;
        if (!user) {
            const user = yield prisma.user.findUnique({
                where: { email }
            });
            restaurantId = user === null || user === void 0 ? void 0 : user.restaurantId;
        }
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const match = bcrypt_1.default.compare(user === null || user === void 0 ? void 0 : user.password, hashedPassword);
        if (!match) {
            return res.status(404).json({ message: "Incorrect Password!" });
        }
        const secret = process.env.JWT_SECRET || "secret";
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role, restaurantId: restaurantId }, secret, { expiresIn: 24 * 60 * 60 * 1000 });
        res.cookie('token', token, {
            httpOnly: true, // Prevent client-side access
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            maxAge: 3600000 * 8 // 8 hour
        });
        return res.status(200).set('Authorization', `Bearer ${token}`).json({ message: "Login successful" });
    }
    catch (error) {
        console.log("Error", error.message);
        return res.status(500).json({ message: "Login Failed!" });
    }
});
exports.Login = Login;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token'); // Clear the cookie
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(405).json({ message: "Logout Failed!" });
    }
});
exports.Logout = Logout;
