const express = require("express");
const {
  createUser,
  LoginUser,
  logout,
  checkUser,
} = require("../controller/Auth.controller");
// const { getGoogleAuthURL, googleCallback } = require("../controllers/auth.controller.js");
const { authenticationMiddleware } = require('../middleware/auth');
const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login",LoginUser)
  .get("/check",authenticationMiddleware, checkUser)
  .get("/logout",authenticationMiddleware ,logout)

exports.router = router;
