import asyncWrapper from "../middleware/async.js";
import { uploadOncloudinary } from "../utils/cludinary.js";

export const ImageUpload = asyncWrapper(async (req, res) => {
  if (!req.file) {
    throw new BadRequest(`image is required`);
  }
  const response = await uploadOncloudinary(req, "image/");
  // console.log(response)
  if (!response?.secure_url) {
    return res.status(500).json({ error: response.error });
  }
 const image = response.secure_url
 res.status(200).json({image:image})
});