const cloudinary = require("cloudinary").v2;
const multer = require("multer");  

cloudinary.config({
    cloud_name: "dwc54v9mo",
    api_key: "398714862258421",
    api_secret: "ROOvEXRo3pR_Fu6nwacfOJ_C0lQ",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return result;
}


const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };