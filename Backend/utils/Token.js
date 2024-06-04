const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


const generateToken =  async(username,email)=>{
   try{
      const token = jwt.sign(
        {username,email},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
      )
      return token;
   }catch(err){
      console.log(err.message);
      return "";
   }
}

module.exports = generateToken;
