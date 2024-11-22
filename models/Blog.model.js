const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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

const Blog = mongoose.model("Blog", userSchema);

module.exports = Blog;
