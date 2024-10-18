const cloudinary = require("cloudinary").v2;

const cloudName = process.env.CLOUDDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDDINARY_API_KEY;
const apiSecret = process.env.CLOUDDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});
const url = "1728974022054-Pedro Pascal"

module.exports = cloudinary;
