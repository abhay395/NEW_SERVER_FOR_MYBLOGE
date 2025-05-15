import mongoose from "mongoose";
import { paginate } from "./plugin/paginate.plugin.js";
const blogeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

blogeSchema.plugin(paginate);
const Blog = mongoose.model("Blog", blogeSchema);

export default Blog;
