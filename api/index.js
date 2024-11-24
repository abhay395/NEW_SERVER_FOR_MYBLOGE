const express = require("express");
// require('express-async-errors')
require("dotenv").config();
const app = express();
const authRouter = require("../routes/Auth.routes");
const { errorHandlerMiddleware } = require("../middleware/error-handler.js");
const userRouter = require("../routes/User.routes");
const contactRouter = require("../routes/Contact.routes");
const commentRouter = require("../routes/Comment.routes");
const blogRouter = require("../routes/Bloge.routes");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const serverless = require("serverless-http");
const cors = require("cors");

// const path = require("path");
const { connectDb } = require("../db/connectdb");

// TODO: cors setup
const corsOptions = {
  origin: "https://uptight-wine.surge.sh", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"], // Allowed methods
  credentials: true, // Allow cookies and headers like Authorization
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
//     credentials: true, // Allow cookies if required
//   })
// );
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Use a secure secret in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL, // MongoDB connection string
      ttl: 14 * 24 * 60 * 60, // Sessions expire after 14 days
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // Cookie expiration time
      secure: process.env.NODE_ENV === "production", // Set this to true if using HTTPS
      httpOnly: true,
    },
  })
);

// TODO: body parser
app.use(express.json());

app.get("/", (req, res) => res.send("Hello world"));
app.use("/auth", authRouter.router);
app.use("/user", userRouter.router);
// app.use("/check", isAuth(), checkRouter.router);
app.use("/bloge", blogRouter.router);
app.use("/contact", contactRouter.router);
app.use("/comment", commentRouter.router);
app.use(errorHandlerMiddleware);
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
module.exports = app;
module.exports.handler = serverless(app);
connectDb();
