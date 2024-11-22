const express = require("express");
require('express-async-errors')
require("dotenv").config();
const app = express();
const authRouter = require("./routes/Auth.routes");
const {errorHandlerMiddleware} = require('./middleware/error-handler.js')
const userRouter = require("./routes/User.routes");
const contactRouter = require("./routes/Contact.routes");
const commentRouter = require("./routes/Comment.routes");
const blogRouter = require("./routes/Bloge.routes");
const MongoStore = require('connect-mongo');
const serverless = require('serverless-http')
const cors = require("cors");

// const path = require("path");
const { connectDb } = require("./db/connectdb");

// TODO: cors setup
app.use(
  cors()
);


// TODO: body parser
app.use(express.json());

app.get('/',(req,res)=>res.send("Hello world"))
app.use("/auth", authRouter.router);
app.use("/user", userRouter.router);
// app.use("/check", isAuth(), checkRouter.router);
app.use("/bloge", blogRouter.router);
app.use("/contact", contactRouter.router);
app.use("/comment", commentRouter.router);
app.use(errorHandlerMiddleware)
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
module.exports = app;
module.exports.handler = serverless(app);
connectDb()