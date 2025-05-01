import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import http from "http"
import webpush from "web-push"

import './utils/cron'

import UserRouter from './routes/Auth'
import CategoryRouter from './routes/Category'
import ProductRouter from './routes/Product'
import EmployeeRouter from './routes/User'
import cloudinaryConnect from "./config/cloudinary";
import RestaurantRouter from "./routes/Restaurant"
import OrderRouter from "./routes/Order"
import DashboardRouter from './routes/Dashboard'

import { registerSocketHandlers } from "./socket";


//    CONFIGURATION
dotenv.config();
const app = express();


app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin"}));
app.use(morgan("common"));
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001'], // Frontend origin
    credentials: true,              // Allow credentials (cookies, headers)
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

cloudinaryConnect();
//add shocket
const server = http.createServer(app);
const io = new Server(server,{
    path:"/socket-server-path",
    cors:{
        origin:"*",
        methods:["GET","POST"],
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
    `mailto:${process.env.MAIL_USER}`,  // Contact email
    process.env.PUBLIC_VAPID_KEY || "",
    process.env.PRIVATE_VAPID_KEY || ""
  );

//Routes
app.use("/api/auth",UserRouter);
app.use("/api/category",CategoryRouter);
app.use("/api/product",ProductRouter);
app.use("/api/restaurant",RestaurantRouter);
app.use("/api/order",OrderRouter);
app.use("/api/user",EmployeeRouter);
app.use("/api/dashboard",DashboardRouter);

app.get("/",(req: Request,res: Response) => {
      res.status(200).json({
        success:true,
        message: "Server is running"
     })
})


//    SERVER
const PORT = process.env.PORT || 8000
server.listen(PORT,() => {
    console.log(`Server start running on port ${PORT}`)
})
