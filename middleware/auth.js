const UnauthenticatedError  = require("../errors/unauthenticated");
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET ||"Your Secret Secret Key"
const authenticationMiddleware = async(req,res,next)=>{
    // console.log(req.headers)
   try {
    const token = req.headers['authorization']
    if(!token){
      res.status(401).json({error:"Access Denied. No token provided"})
    }
    // console.log(token)
    // console.log(token.split(" "))
    const verified = jwt.verify(token,JWT_SECRET);
    req.user = verified;
    next()
   } catch (error) {
    // console.log(error)
    throw new UnauthenticatedError("No authorized to acces")
    // console.log(error)
   }
  }
  module.exports = {authenticationMiddleware}