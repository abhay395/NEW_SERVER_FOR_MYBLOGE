import express from "express";
import authenticationMiddleware from "../middleware/auth.js";
import asyncWrapper from "../middleware/async.js";
import UserController from "../controller/User.controller.js";

const router = express.Router();

router
  .get(
    "/own",
    authenticationMiddleware,
    asyncWrapper(UserController.featchUser)
  )
  .get(
    "/blogs",
    authenticationMiddleware,
    asyncWrapper(UserController.featchUserBloge)
  )
  .patch(
    "/update",
    authenticationMiddleware,
    asyncWrapper(UserController.updateUser)
  );

export default router
