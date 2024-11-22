const {CustomAPIError} = require('../errors/custome-error')

const errorHandlerMiddleware = (err,req,res,next)=>{

    if(err instanceof CustomAPIError){
        // console.log(err.message)
        return res.status(err.statusCode).json({message:err.message})
    }
    console.log(err);
    return res.status(500).json({message:"Somthing Went Wrong ,Please try again"})
}

module.exports = {errorHandlerMiddleware}