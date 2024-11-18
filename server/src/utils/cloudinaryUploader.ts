import { v2 as cloudinary } from 'cloudinary';
import { promisify } from 'util';

// Promisify the Cloudinary uploader for easier async/await usage
const uploadToCloudinary = async(file:any, folder:string) => {
  return await cloudinary.uploader.upload(file.tempFilePath, {
    resource_type: 'auto',  // Automatically detects whether the file is an image, video, or raw file (e.g., PDF)
    folder: folder || 'uploads',  // Upload to a specific folder
  });
};

export default uploadToCloudinary;