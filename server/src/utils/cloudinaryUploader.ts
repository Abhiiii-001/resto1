import { v2 as cloudinary } from 'cloudinary';
import { promisify } from 'util';

// Promisify the Cloudinary uploader for easier async/await usage
const uploadToCloudinary = async(file:any, folder:string) => {
  return await cloudinary.uploader.upload(file?.tempFilePath, {
    resource_type: 'auto',  // Automatically detects whether the file is an image, video, or raw file (e.g., PDF)
    folder: folder || 'uploads',  // Upload to a specific folder
  });
};

export const uploadPDFToCloudinary = async (fileBuffer: any, folder:string = 'invoices') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder ,format:"pdf"},  // 'raw' is used for non-image files like PDFs
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);  // Pass the buffer to the upload stream
  });
};

export default uploadToCloudinary;