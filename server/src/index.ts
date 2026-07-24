import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import dotenv from "dotenv"
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import http from "http"
import webpush from "web-push"

import './utils/cron'
import logger from './utils/logger'

import UserRouter from './routes/Auth'
import CategoryRouter from './routes/Category'
import ProductRouter from './routes/Product'
import EmployeeRouter from './routes/User'
import cloudinaryConnect from "./config/cloudinary";
import RestaurantRouter from "./routes/Restaurant"
import OrderRouter from "./routes/Order"
import DashboardRouter from './routes/Dashboard'
import SubscriptionRouter from './routes/Subscription'
import ContactRouter from './routes/Contact'

import { registerSocketHandlers } from "./socket";
import { setupAdminJS } from "./admin";


//    CONFIGURATION
dotenv.config();
const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:3000', 
    process.env.RESTAURANT_CLIENT_URL || 'http://localhost:3001',
    process.env.BACKEND_URL || "http://localhost:8000",
    process.env.BASE_RESTAURANT_URL || "http://localhost:3000"
];
app.use(cors({
    origin: (origin, callback) => {
        // origin is undefined for non-browser requests, 'null' for redirects/sandboxes
        if (!origin || origin === 'null' || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            logger.warn(`[CORS] Blocked request from origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

async function startServer() {
    await setupAdminJS(app);

    // 2. Global Middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(helmet({
        contentSecurityPolicy: false,
    }));
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
    app.use(morgan(morganFormat, {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }));
    app.use(cookieParser());
    app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }));

    cloudinaryConnect();

    // 3. Socket.io Setup
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        },
        transports: ["websocket", "polling"],
    });

    registerSocketHandlers(io);

    app.use((req, res, next) => {
        //@ts-ignore
        req.io = io;  // Attach io instance to every request
        next();
    });
    
    webpush.setVapidDetails(
        `mailto:${process.env.MAIL_USER}`,
        process.env.PUBLIC_VAPID_KEY || "",
        process.env.PRIVATE_VAPID_KEY || ""
    );

    // 4. API Routes
    app.use("/api/auth", UserRouter);
    app.use("/api/category", CategoryRouter);
    app.use("/api/product", ProductRouter);
    app.use("/api/restaurant", RestaurantRouter);
    app.use("/api/order", OrderRouter);
    app.use("/api/user", EmployeeRouter);
    app.use("/api/dashboard", DashboardRouter);
    app.use('/api/subscription', SubscriptionRouter);
    app.use('/api/contact', ContactRouter);

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: "Server is running"
        });
    });

    // 5. Start Listening
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
        logger.info(`Server start running on port ${PORT}`);
    });
}

// Bootstrap the application
startServer().catch(err => {
    logger.error("Failed to start server:", err);
});

export default app;
