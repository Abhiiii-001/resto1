"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const web_push_1 = __importDefault(require("web-push"));
const Auth_1 = __importDefault(require("./routes/Auth"));
const Category_1 = __importDefault(require("./routes/Category"));
const Product_1 = __importDefault(require("./routes/Product"));
const cloudinary_1 = __importDefault(require("./config/cloudinary"));
const Restaurant_1 = __importDefault(require("./routes/Restaurant"));
const Order_1 = __importDefault(require("./routes/Order"));
const socket_1 = require("./socket");
//    CONFIGURATION
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Frontend origin
    credentials: true, // Allow credentials (cookies, headers)
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
(0, cloudinary_1.default)();
//add shocket
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    path: "/socket-server-path",
    cors: {
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST"],
        credentials: true
    }
});
(0, socket_1.registerSocketHandlers)(io);
app.use((req, res, next) => {
    //@ts-ignore
    req.io = io; // Attach io instance to every request
    next();
});
web_push_1.default.setVapidDetails(`mailto:${process.env.MAIL_USER}`, // Contact email
process.env.PUBLIC_VAPID_KEY || "", process.env.PRIVATE_VAPID_KEY || "");
//Routes
app.use("/api/auth", Auth_1.default);
app.use("/api/category", Category_1.default);
app.use("/api/product", Product_1.default);
app.use("/api/restaurant", Restaurant_1.default);
app.use("/api/order", Order_1.default);
//    SERVER
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server start running on port ${PORT}`);
});
