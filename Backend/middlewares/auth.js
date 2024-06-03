const {User} = require('../models/userSchema')
const jwt = require('jsonwebtoken')


const checkUser = async (req,res,next)=>{
 try{
    const headers = req.headers.authorization;
    if(!headers){
        return res.status(401).json({error:true,message:'Unauthorized'})
    }
    const token  = headers.split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET,async(err,user)=>{
        if(err){
            return res.status(401).json({error:true,message:err.message})
        }
        const doc = await User.find({username:user.username})
        if(!doc){
            return res.status(401).json({error:true,message:'Unauthorized'})
        }
        req.user = {username:user.username};
        next();
    })

 }catch(err){
       console.log(err.message);
       return  res.status(401).json({error:true,message:'Unauthorized'})
 }
}

module.exports = {checkUser};