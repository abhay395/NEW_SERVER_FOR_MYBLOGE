const express = require("express");
const { featchUser } = require("../controller/User.controoler");
const { authenticationMiddleware } = require('../middleware/auth');
const { updateUser } = require("../controller/User.controoler");

const router = express.Router()

router
.get('/own',authenticationMiddleware,featchUser)
.patch('/update',authenticationMiddleware,updateUser)
exports.router = router;