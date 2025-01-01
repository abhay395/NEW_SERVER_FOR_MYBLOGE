const asyncWrapper = require("../middleware/async");
const User = require("../models/User.model");
const Blog = require("../models/Blog.model");
const redis = require('../redis.js')

exports.featchUser = asyncWrapper(async (req, res) => {
  const cacheKey = `user_${req.user._id}`
  // fetch User with User Id 
  const cachedUser = await redis.get(cacheKey);
  if (cachedUser) {
    console.log("Cache Hit");
    return res.status(200).json(JSON.parse(cachedUser))
  }

  const user = await User.findOne({ _id: req.user._id }).exec();
  const { name, email, image, isImage } = user;
  await redis.set(cacheKey, JSON.stringify({ name, email, image, isImage }), "EX", 500)
  res.status(200).json({
    name,
    email,
    image,
    isImage,
  });
});
exports.featchUserBloge = asyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const cacheKey = `user_bloges_${userId}`
  const cachedBlogs = await redis.get(cacheKey);
  if (cachedBlogs) {
    console.log("Cache Hit");
    const parseData = JSON.parse(cachedBlogs)
    return res.status(201).json({ blogs: parseData })
  }
  console.log("Cache miss")
  const blogs = await Blog.find({ userId: userId });
  await redis.set(cacheKey, JSON.stringify(blogs), "EX", 300)
  res.status(201).json({ blogs });
});
exports.updateUser = asyncWrapper(async (req, res) => {
  const { image, name, email, bio, phone } = req.body;
  const updateObj = { image, name, email, bio, phone };
  if (image != "") updateObj.isImage = true;
  // console.log(updateObj)

  const user = await User.findByIdAndUpdate(req.user._id, updateObj, {
    new: true,
  });
  const cacheKey =`user_${req.user._id}`
  await redis.del(cacheKey)
  console.log(user);
  res.status(200).json({
    name: user.name,
    image: user.image,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    isImage: user.isImage,
  });
});
