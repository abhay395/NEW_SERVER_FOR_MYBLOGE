import Bloge from "../models/Blog.model.js";
import uploadToCloudinary from "../utils/cludinary.js";


export default {
  createBloge: async (req) => {
    try {
      const { title, description, category } = req.body;
      if (!req.file) {
        throw new Error("Image is required");
      }
      const urlObje = await uploadToCloudinary({
        file: req.file,
        folder: 'uploads',
        resource_type: 'auto', // image, video, raw, or auto
      });
      // console.log(url)
      const blog = await Bloge.create({
        title,
        description,
        category,
        url:urlObje.secure_url,
        userId: req.user._id,
      });
      return await blog.populate("userId");
    } catch (error) {
      throw error;
    }
  },
  featchBloges: async (filter, option) => {
    try {
      const result = await Bloge.paginate(filter, option);
      return result;
    } catch (error) {
      throw error;
    }
  },
  featchBlogeById: async (id) => {
    try {
      const result = await Bloge.findById(id).populate("userId");
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateBlogeById: async (data, id) => {
    try {
      const blog = await Bloge.findByIdAndUpdate(id, data, { new: true });
      return await blog.populate("userId");
    } catch (error) {
      throw error;
    }
  },
  deleteBlogeById: async (id) => {
    try {
      const blog = await Bloge.findByIdAndDelete(id);
      return blog;
    } catch (error) {
      throw error;
    }
  }
};
