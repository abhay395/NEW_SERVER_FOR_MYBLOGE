import express from 'express';
import CommentController from '../controller/Comment.controller.js';
import authenticationMiddleware from '../middleware/auth.js';
import asyncWrapper from '../middleware/async.js';
const router = express.Router();

router
.get('/:id',asyncWrapper(CommentController.getPostComment))
.post('/create',authenticationMiddleware,asyncWrapper(CommentController.createComment))
.patch('/like/:id',authenticationMiddleware,asyncWrapper(CommentController.likeAddAndRemove))

export default router