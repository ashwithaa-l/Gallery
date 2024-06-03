const mongoose=require('mongoose');

const imageSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true
    },
    image:{
        type:String,
        unique:true
    },
    username:{
        type:String
    }
})
const Image=mongoose.model('image',imageSchema); 

module.exports={Image}