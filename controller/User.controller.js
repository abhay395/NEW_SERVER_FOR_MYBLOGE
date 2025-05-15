// import asyncWrapper from "../middleware/async.js";
// import User from "../models/User.model.js";
// import Blog from "../models/Blog.model.js";
// import redis from '../redis.js';
import UserService from "../service/User.service.js";
import { sendSuccessMessage } from "../utils/helper.js";
import { pick } from "../utils/pick.js";

export default {
  featchUser: async (req, res) => {
    // console.log(req.user)
    const result = await UserService.featchUser(req.user._id);
    sendSuccessMessage(res, 200, "User fetched successfully", result);
  },
  featchUserBloge: async (req, res) => {
    const filter = pick(req.query, ["name", "isActive", "onlyExpired"]);
    const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);
    const result = await UserService.featchUserBloge(filter, options);
    sendSuccessMessage(res, 200, "User Bloge fetched successfully", result);
  },
  updateUser: async (req, res) => {
    const result = await UserService.updateUser(req.body, req.params.id);
    sendSuccessMessage(res, 200, "User updated successfully", result);
  },
  deleteUser: async (req, res) => {
    const result = await UserService.deleteUser(req.params.id);
    sendSuccessMessage(res, 200, "User deleted successfully", result);
  },
};
