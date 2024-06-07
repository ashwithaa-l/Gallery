
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
        const token = await generateToken(doc.username,doc.email);
        console.log(token)
        return res.status(200).json({error:false,message:{token:token}});
    }catch(err){
       return res.status(401).json({error:true,message:'Login Failed'})
    }
}



const signup = async (req, res) => {
    const  username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        await newUser.save();
        return res.status(201).json({ error: false, message: 'User created successfully' });
    } catch (err) {
        console.error('User creation failed:', err);
        return res.status(500).json({ message: "User creation failed, please try again later" });
    }
};


const getUser = async(req,res)=>{
    try{
        if(!req.user){
            return res.status(400).json({error:true,message:'User not found'});
        }
        return res.status(200).json({error:false,message:req.user});

    }catch(err){
        console.error('User not found:',err);
        return res.status(500).json({error:true,message:'User not found'});
    }
}


module.exports = {login,signup,getUser};