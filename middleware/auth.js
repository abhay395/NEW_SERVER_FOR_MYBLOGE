import UnauthenticatedError from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "Your Secret Secret Key";
const authenticationMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"] || req.headers["Authorization"];
    if (!authorization) {
      return next(new UnauthenticatedError("No authorized to acces"));
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return next(new UnauthenticatedError("No authorized to acces"));
    }

    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      next(new UnauthenticatedError("Invalid Token"));
    }
  } catch (error) {
    next(error)
  }
};

export default authenticationMiddleware;
