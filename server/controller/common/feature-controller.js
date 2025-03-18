const Feature = require("../../models/Feature");


const addFeatureImage = async (req, res) => {
    console.log(req.body.image);
    
    try{
        const  image  = req.body.image;
        
        console.log(image, "Image");

        const featureImages = new Feature({
            image,
        });
        console.log(featureImages,"img");
        

        await featureImages.save();

        res.status(201).json({
            success: true,
            data: featureImages,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};



const getFeatureImages = async (req, res) => {
    try{
        const images = await Feature.find({});
 
        res.status(200).json({
            success: true,
            data: images,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error Occured!",
        });
    }
};

module.exports = { addFeatureImage, getFeatureImages };