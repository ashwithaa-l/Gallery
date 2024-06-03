require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();

const userRoutes=require('./routes/userRoutes');
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

