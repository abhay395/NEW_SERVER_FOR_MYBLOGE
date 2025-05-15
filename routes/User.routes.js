import express from "express";
import authenticationMiddleware from "../middleware/auth.js";
import asyncWrapper from "../middleware/async.js";
import UserController from "../controller/User.controller.js";
import { upload } from "../middleware/multer.middlewares.js";

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
    upload.single("image"),
    authenticationMiddleware,
    asyncWrapper(UserController.updateUser)
  );

export default router;
