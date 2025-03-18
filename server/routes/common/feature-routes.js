const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controller/common/feature-controller");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/add", upload.single("my_file"), addFeatureImage);
router.get("/get", getFeatureImages);

module.exports = router;