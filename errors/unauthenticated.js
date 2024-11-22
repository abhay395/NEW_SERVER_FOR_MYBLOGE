const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("./custome-error");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

// const UNAUTHORIZED = new UnauthenticatedError("hello");
module.exports = UnauthenticatedError;