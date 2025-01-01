const BadRequest = require("../errors/bad-request");
const asyncWrapper = require("../middleware/async");
const redis = require('../redis.js')
// const { uploadOncloudinary } = require("../utils/cludinary");

const Bloge = require("../models/Blog.model");

exports.createBlog = asyncWrapper(async (req, res) => {
  const { title, description, category, url } = req.body;
  const requiredField = { title, description, category };
   const cacheKey = `user_bloges_${req.user._id}`
  for (const [key, value] of Object.entries(requiredField)) {
    if (!value) {
      throw new BadRequest(`${key} is required`);
    }
  }
  // console.log(req.user);
  const blog = new Bloge({
    title,
    description,
    category,
    url,
    userId: req.user._id,
  });
  const doc = await blog.save();
  const result = await doc.populate("userId");
  await redis.del(cacheKey)
  await redis.del("blogs_list");

  console.log(result);
  return res.status(201).json({ bloge: result });
});
exports.featchBloges = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default values for pagination

    const cacheKey = `blogs_list_page_${page}_limit_${limit}`; // Cache key
    // Fetch blogs with pagination and sorting in a single query
    const cachedBlogs = await redis.get(cacheKey);
    if (cachedBlogs) {
      console.log("Cache hit");
      return res.status(200).json(JSON.parse(cachedBlogs));
    }
    console.log("Cache miss");
    const bloge = await Bloge.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("userId")
      .exec();
    // Get the total count of blogs
    const totalDocs = await Bloge.countDocuments();

    const response = { bloge, totalDocs };
    await redis.set(cacheKey, JSON.stringify(response), "EX", 300); // Cache for 5 minutes

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.featchBlogeById = async (req, res) => {
  try {
    const cacheKey = `blog_post_${req.params.id}`;
    const cachedBlog = await redis.get(cacheKey);
    if (cachedBlog) {
      console.log("Cache hit");
      console.log(cachedBlog)
      return res.status(200).json({bloge:JSON.parse(cachedBlog)});
    }
    console.log("Cache miss");
    const bloge = await Bloge.findById(req.params.id).populate("userId");
    if (!bloge) {
      return res.status(404).json({ error: "Blog not found" });
    }
    await redis.set(cacheKey, JSON.stringify(bloge), "EX", 600); // Cache for 10 minutes
    return res.status(200).json({ bloge });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.updateBlogeById = async (req, res) => {
  try {
    const { title, description, url, category } = req.body;
    const bloge = await Bloge.findByIdAndUpdate(
      req.params.id,
      { title, description, url, category },
      { new: true }
    ).populate("userId");
    // Invalidate cache for this blog and blogs list
    const cacheKey = `blog_post_${req.params.id}`;
    await redis.del(cacheKey);
    await redis.del(`user_bloges_${req.user._id}`)
    await redis.del("blogs_list");
    return res.status(200).json({ bloge });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.deletBlogeById = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const bloge = await Bloge.findByIdAndDelete(id);

  const cacheKey = `blog_post_${id}`;
  await redis.del(cacheKey);
  await redis.del(`user_bloges_${req.user._id}`)
  await redis.del("blogs_list");
  return res.status(200).json({ bloge, message: "Bloge deleted" });
});
