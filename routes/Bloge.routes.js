const express = require("express");
const { createBlog, featchBloges, featchBlogeById, deletBlogeById, updateBlogeById } = require("../controller/Bloge.controller");
const { authenticationMiddleware } = require("../middleware/auth");
const { upload } = require("../middleware/multer.middlewares");
const { ImageUpload } = require("../controller/uploadImage.controller");
const router = express.Router();

router.post("/create",authenticationMiddleware,createBlog)
.post('/upload',upload.single('image'),ImageUpload)
.get('/all',featchBloges)
.get('/:id',featchBlogeById)
.patch('/:id',authenticationMiddleware,updateBlogeById)
.delete('/:id',authenticationMiddleware,deletBlogeById)

exports.router = router;