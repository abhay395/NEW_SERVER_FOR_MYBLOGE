import express from "express";
import AuthController from "../controller/Auth.controller.js";
// import { getGoogleAuthURL, googleCallback } from "../controllers/auth.controller.js";
import authenticationMiddleware from '../middleware/auth.js';
import asyncWrapper from "../middleware/async.js";
const router = express.Router();

router
  .post("/signup", asyncWrapper(AuthController.createUser))
  .post("/login", asyncWrapper(AuthController.LoginUser))
  // .get("/check",authenticationMiddleware)
  .get("/logout", authenticationMiddleware, asyncWrapper(AuthController.LogoutUser))

export default router