"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
require('dotenv').config();
const cloudinaryConnect = () => {
    try {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        });
    }
    catch (error) {
        //console.log(error);
    }
};
exports.default = cloudinaryConnect;
