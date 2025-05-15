import express from "express";
import dotenv from "dotenv";
import authRouter from "../routes/Auth.routes.js";
import { errorHandlerMiddleware } from "../middleware/error-handler.js";
import userRouter from "../routes/User.routes.js";
import contactRouter from "../routes/Contact.routes.js";
import commentRouter from "../routes/Comment.routes.js";
import blogRouter from "../routes/Bloge.routes.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import serverless from "serverless-http";
import cors from "cors";
import"../db/connectdb.js";

dotenv.config();
const app = express();

// CORS setup
app.use(cors({
  origin: ["https://my-bloge.netlify.app", "http://localhost:5173"]
}));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

// Body parser
app.use(express.json());

// Routes
// app.get("/", (req, res) => res.send("Hello world"));
app.use("/auth", authRouter.router);
app.use("/user", userRouter.router);
app.use("/bloge", blogRouter.router);
app.use("/contact", contactRouter.router);
app.use("/comment", commentRouter.router);
app.use(errorHandlerMiddleware);

// Connect to database and export
connectDb();
export default app;
export const handler = serverless(app);