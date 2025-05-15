import express from "express";
// import {
//   createBlog,
//   featchBloges,
//   featchBlogeById,
//   deletBlogeById,
//   updateBlogeById
// } from "../controller/Bloge.controller.js";
import asyncWrapper from "../middleware/async.js";
import authenticationMiddleware from "../middleware/auth.js";
import { upload } from "../middleware/multer.middlewares.js";
// import { ImageUpload } from "../controller/uploadImage.controller.js";
import BlogeController from "../controller/Bloge.controller.js";

const router = express.Router();

router
  .post("/create",upload.single("image"),authenticationMiddleware,asyncWrapper(BlogeController.createBlog))
  // .post('/upload', upload.single('image'), ImageUpload)
  .get("/all", asyncWrapper(BlogeController.featchBloges))
  .get("/:id", asyncWrapper(BlogeController.featchBlogeById))
  .patch("/:id",upload.single("image"),authenticationMiddleware,asyncWrapper(BlogeController.updateBlogeById))
  .delete("/:id",authenticationMiddleware,asyncWrapper(BlogeController.deleteBlogeById))

export default router;
