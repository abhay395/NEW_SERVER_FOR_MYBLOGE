const { CustomAPIError, createCustomError } = require("../errors/custome-error")

const asyncWrapper = (fn)=>{
    return async(req,res,next)=>{
        try {
            await fn(req,res,next)
        } catch (error) {
        if(error.code===11000){
            // console.log('ss')
            console.log(error.keyPattern)
            if(error.keyPattern["contact.email"]){
                next(createCustomError("This email already exist",400))
                return;
            }else if(error.errorResponse.keyPattern.username){
                next(createCustomError("This username already exist",400))
            }
        }
          next(error)
    }
    }
}
module.exports = asyncWrapper