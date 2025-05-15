import express from "express";
import dotenv from "dotenv";
// import {errorHandlerMiddleware} from "./middleware/error-handler.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import cors from "cors";
import"./db/connectdb.js";
import router from "./routes/index.routes.js";

dotenv.config();
const app = express();

app.use(cors());
// Body parser
app.use(express.json());
app.use('/api',router)
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app