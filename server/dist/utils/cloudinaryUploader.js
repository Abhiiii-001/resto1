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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPDFToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
// Promisify the Cloudinary uploader for easier async/await usage
const uploadToCloudinary = (file, folder) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cloudinary_1.v2.uploader.upload(file === null || file === void 0 ? void 0 : file.tempFilePath, {
        resource_type: 'auto',
        folder: folder || 'uploads',
    });
});
const uploadPDFToCloudinary = (fileBuffer_1, ...args_1) => __awaiter(void 0, [fileBuffer_1, ...args_1], void 0, function* (fileBuffer, folder = 'invoices') {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ resource_type: 'auto', folder, format: "pdf" }, // 'raw' is used for non-image files like PDFs
        (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        uploadStream.end(fileBuffer); // Pass the buffer to the upload stream
    });
});
exports.uploadPDFToCloudinary = uploadPDFToCloudinary;
exports.default = uploadToCloudinary;
