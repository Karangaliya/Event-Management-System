import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'karangaliya', 
  api_key: '713926982637539', 
  api_secret: 'SX_-8N-2PcZfykDJenMhtpaej0I' 
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
      console.error('Error Uploading Image:', error);
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteImage = async (publicId) => {
    try {
      const result = await cloudinary.uploader.destroy(publicId);

      return result;
    } catch (error) {
      
      console.error('Error deleting image:', error);
    }
};



export {uploadOnCloudinary,deleteImage}