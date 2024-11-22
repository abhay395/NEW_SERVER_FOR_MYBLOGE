const BadRequest = require("../errors/bad-request");
const asyncWrapper = require("../middleware/async");
const { uploadOncloudinary } = require("../utils/cludinary");

const Bloge = require("../models/Blog.model");

exports.createBlog = asyncWrapper(
  async (req, res) => {
    const { title, description, category,url } = req.body;
    const requiredField = { title, description, category };
    for (const [key, value] of Object.entries(requiredField)) {
      if (!value) {
        throw new BadRequest(`${key} is required`);
      }
    }

    // console.log(response)
    // console.log('title',req.body)
    console.log(req.user)
    const blog = new Bloge({
      title,
      description,
      category,
      url,
      userId:req.user._id
    });
    const doc = await blog.save();
    const result = await doc.populate("userId");
    console.log(result);
    return res.status(201).json({ bloge: result });
  }

  // catch (error) {
  //     return res.status(400).json({ error: error.message })
);
exports.featchBloges = async (req, res) => {
  try {
    let bloge = Bloge.find({});
    let totalbloge = Bloge.find({});
    const totalDocs = await totalbloge.count();
    // const bloge = await result.populate("userId")
    // // console.log(bloge)
    if (req.query.page && req.query.limit) {
      const page = req.query.page;
      const limit = req.query.limit;
      bloge = bloge.skip(limit * (page - 1)).limit(limit);
    }
    const docs = await bloge.populate("userId").exec();

    return res.status(200).json({ bloge: docs, totalDocs });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.featchBlogeById = async (req, res) => {
  try {
    const bloge = await Bloge.findById(req.params.id).populate("userId");
    return res.status(200).json({ bloge });
    // const bloge = await result.populate("userId")
    // // console.log(bloge)
    // return res.status(200).json({ bloge })
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
