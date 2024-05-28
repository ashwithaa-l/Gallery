require('dotenv').config();
const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();

app.use(cors())
app.use(bodyParser.json());

app.listen(8000,function(){
    console.log('listening on port 8000');
});

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected db");
        }
        catch(error){
console.log(error);
console.log("could'nt connect");
    }
}

connectdb();