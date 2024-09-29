const jwt = require('jsonwebtoken');
const dotenv =require('dotenv');
dotenv.config()


const validateJWT = async(req,res,next)=>{
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        // console.log("Headers:", req.headers);
        const token = req.headers.authorizations;
        if (!token) {
          return res.status(401).json({message:"Token not provided"});
        }
    
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
          next();
        } else {
          // console.log("Token not verified");
          return res.status(401).json({message:"Invalid Token"});
        }
      } catch (error) {
        console.error("Error validating token:", error.message);
        return res.status(401).json({message:"Token validation error"});
      }  
};
module.exports=validateJWT;