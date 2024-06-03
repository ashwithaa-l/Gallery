
const bcrypt = require('bcrypt');
const generateToken = require('../utils/Token')
const {User}=require('../models/userSchema');


const login = async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        if(!username || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const doc = await User.findOne({username:username});
        if(!doc){
            return res.status(400).json({message:"User does not exist"});
        }
        const isValid = bcrypt.compare(password,doc.password);
        if(!isValid){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = generateToken(doc.username,doc.email);
        console.log(token)
        return res.status(200).json({error:false,message:{token:token}});
    }catch(err){
       return res.status(401).json({error:true,message:'Login Failed'})
    }
}



const signup = async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password; 
    try{
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username:username,
            email:email,
            password:hashPassword
        });
        await newUser.save();
       
        if(newUser){
        return res.status(200).json({error:false,message:'User created successfully'});
        }

    }catch(err){
        return res.status(500).json({message:"User creation failed"});
    }
}

module.exports = {login,signup};