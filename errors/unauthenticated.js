import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends Error {
  constructor(message = "Not authorized to access this route") {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;