const jwt = require("jsonwebtoken")
const User = require("../models/User")
const JWT_SECRET = require("../config")


//auth
exports.auth = async(req,res,next)=>{
    try{
        //extract token
        const authHeader = req.header("Authorization");
        const token =
        req.cookies.token ||
        req.body.token ||
        (authHeader && authHeader.replace("Bearer ", ""));

        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing'
            })
        }

        try{
            const decode = jwt.verify(token,JWT_SECRET)
            req.userId = decode.userId
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token",
            error:err.message
        })
    }
}