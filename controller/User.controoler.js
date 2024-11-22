const asyncWrapper = require("../middleware/async");
const User = require("../models/User.model");

exports.featchUser = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).exec();
  const { name, email, image, isImage } = user;
  res.status(200).json({
    name,
    email,
    image,
    isImage,
  });
});
exports.updateUser = asyncWrapper(async (req, res) => {
  const { image, name, email, bio, phone } = req.body;
  const updateObj = { image, name, email, bio, phone };
  if (image != "") updateObj.isImage = true;
  // console.log(updateObj)

  const user = await User.findByIdAndUpdate(req.user._id, updateObj, { new: true }   );
  console.log(user)
  res
    .status(200)
    .json({
      name: user.name,
      image: user.image,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      isImage: user.isImage,
    });
});
