
const {Image} = require('../models/imageSchema')


const addImage = async(req,res)=>{
   try{
      const {id,title} = req.body;
      const imageFile = req.file ? req.file.path : null;
      const image = `${process.env.BACKEND_URL}${imageFile}`
      let existingImage;

      if(id){
         existingImage = await Image.findById(id);
      }

      if(existingImage){
        existingImage.title = title;
        existingImage.image = image;
        if(image){
            existingImage.image = image;
        }
        await existingImage.save();
        return res.status(200).json({error:false,message:'Image updated successfully'})
      }
      else{
        const newImage = new Image({
            title,
            image,
            username:req.user.username
        });
        await newImage.save();
        console.log('Image created',image)
        return res.status(201).json({error:false,message:'Image added successfully'})
      }
   }catch(err){
    return res.status(500).json({ error: true, message: err.message });
   }
}


const getImages = async(req,res) =>{
     try{
      const images = await Image.find({})
      return res.status(200).json({message:images})
     }catch(err){
      return res.status(500).json({ error: true, message: err.message });
     }
}

const getUserimages = async(req,res)=>{
   try{
      const images = await Image.find({username:req.user.username});
      return res.status(200).json({message:images})
   }catch(err){
      return res.status(500).json({ error: true, message: err.message })
   }
}

module.exports = {addImage,getImages,getUserimages};