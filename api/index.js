import express from "express";
import dotenv from "dotenv";
import errorHandlerMiddleware from "../middleware/error-handler.js";
import router from "../routes/index.routes.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import serverless from "serverless-http";
import cors from "cors";
import"../db/connectdb.js";

dotenv.config();
const app = express();

// CORS setup

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
app.use(cors());
// Body parser
app.use(express.json());
app.get("/", (req, res) => res.send("Hello world"));
app.use('/api',router)
app.use(errorHandlerMiddleware);

// Connect to database and export
export default app;
export const handler = serverless(app);