import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'

import UserRouter from './routes/Auth'
import CategoryRouter from './routes/Category'
import ProductRouter from './routes/Product'
import cloudinaryConnect from "./config/cloudinary";
import RestaurantRouter from "./routes/Restaurant"


//    CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin"}));
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

cloudinaryConnect();

//Routes
app.use("/api/auth",UserRouter);
app.use("/api/category",CategoryRouter);
app.use("/api/product",ProductRouter);
app.use("/api/restaurant",RestaurantRouter);

//    SERVER
const PORT = process.env.PORT || 8000
app.listen(PORT,() => {
    console.log(`Server start running on port ${PORT}`)
})