const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
require('dotenv').config();
const multer  = require('multer')

const userRoutes=require('./routes/userRoutes');

const imageRoutes = require('./routes/imageRoutes');


app.use(cors())
app.use(bodyParser.json());

app.listen(8000,function(){
    console.log('listening on port 8000');
});

try{
   const connectdb = async ()=>{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to database');
   }
   connectdb()
}catch(err){
    console.log(err.message);
}



app.use('/users',userRoutes);
app.use('/images',imageRoutes)
app.use('/uploads',express.static('uploads'))

