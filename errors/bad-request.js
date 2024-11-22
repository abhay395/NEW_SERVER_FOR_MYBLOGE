const {CustomAPIError} = require('./custome-error')
const {StatusCodes} = require('http-status-codes')

class BadRequest extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
        // console.log(message)
    }
}
module.exports = BadRequest