const BadRequest = require("../errors/bad-request");
const asyncWrapper = require("../middleware/async");
const Bloge = require("../models/Blog.model");

exports.createBlog = asyncWrapper(async (req, res) => {
  const { title, description, category, url } = req.body;
  const requiredField = { title, description, category };

  for (const [key, value] of Object.entries(requiredField)) {
    if (!value) {
      throw new BadRequest(`${key} is required`);
    }
  }

  const blog = new Bloge({
    title,
    description,
    category,
    url,
    userId: req.user._id,
  });
  const doc = await blog.save();
  const result = await doc.populate("userId");

  console.log(result);
  return res.status(201).json({ bloge: result });
});

exports.featchBloges = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const bloge = await Bloge.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("userId")
      .exec();
    
    const totalDocs = await Bloge.countDocuments();

    return res.status(200).json({ bloge, totalDocs });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.featchBlogeById = async (req, res) => {
  try {
    const bloge = await Bloge.findById(req.params.id).populate("userId");
    if (!bloge) {
      return res.status(404).json({ error: "Blog not found" });
    }
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
    return res.status(200).json({ bloge });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.deletBlogeById = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const bloge = await Bloge.findByIdAndDelete(id);
  return res.status(200).json({ bloge, message: "Blog deleted" });
});
