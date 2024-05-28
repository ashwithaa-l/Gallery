const mongoose = require('mongoose');

const imageSchema=new mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    username:{
        type:String
    }
},{
timestamps:true
})

const Image=mongoose.model('image',imageSchema);

module.exports ={Image};