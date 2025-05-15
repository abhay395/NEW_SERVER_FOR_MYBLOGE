import BlogeService from "../service/Bloge.service.js";
import { sendSuccessMessage } from "../utils/helper.js";
import { pick } from "../utils/pick.js";

export default {
  createBlog: async (req, res) => {
    const result = await BlogeService.createBloge(req);
    sendSuccessMessage(res, 201, "Bloge created successfully", result);
  },
  featchBloges: async (req, res) => {
    const filter = pick(req.query, ["name", "isActive", "onlyExpired"]);
    const options = pick(req.query, ["sortBy", "limit", "page", "populate"]);
    console.log(options)
    const result = await BlogeService.featchBloges(filter, options);
    sendSuccessMessage(res, 200, "Bloge fetched successfully", result);
  },
  featchBlogeById: async (req, res) => {
    const result = await BlogeService.featchBlogeById(req.params.id);
    sendSuccessMessage(res, 200, "Bloge fetched successfully", result);
  },
  updateBlogeById: async (req, res) => {
    const result = await BlogeService.updateBlogeById(req.body, req.params.id);
    sendSuccessMessage(res, 200, "Bloge updated successfully", result);
  },
  deleteBlogeById: async (req, res) => {
    const id = req.params.id;
    const result = await BlogeService.deleteBlogeById(id);
    sendSuccessMessage(res, 200, "Bloge deleted successfully", result);
  },
};
