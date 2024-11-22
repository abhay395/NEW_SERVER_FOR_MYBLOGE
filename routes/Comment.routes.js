const express = require('express');
const { getPostComment, createComment, likeAddAndRemove } = require('../controller/Comment.controller');
const { isAuth } = require('../service/com');
const { authenticationMiddleware } = require('../middleware/auth');
const router = express.Router();

router
.get('/:id',getPostComment)
.post('/create',authenticationMiddleware,createComment)
.patch('/like/:id',authenticationMiddleware,likeAddAndRemove)

exports.router = router;