import fs from "fs"
import cloudinary from "../middlewares/cloudinary.js";


export const uploadFile = async (filePath, options = {}) => {
    try {
       const response = await cloudinary.uploader.upload(filePath, options);
       fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting the file:', err);
        } else {
          console.log('File deleted successfully:');
        }
      });

        return response;
    } catch (error) {
        throw error;
    }
}
