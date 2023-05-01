const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require('dotenv');
dotenv.config();

// Configure Cloudinary with credentials

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Cloudinary Storage

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lost_pets",
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = { storage, cloudinary };