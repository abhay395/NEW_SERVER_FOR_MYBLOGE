import AuthService from "../service/Auth.service.js";
import { sendSuccessMessage } from "../utils/helper.js";

export default {
  createUser: async (req, res) => {
    const result = await AuthService.createUser(req.body);
    sendSuccessMessage(res, 201, "User Signed In successfully", result)
  },
  LoginUser: async (req, res) => {
    const result = await AuthService.LoginUser(req.body);
    sendSuccessMessage(res, 201, "User Loged In successfully", result)
  },
  LogoutUser: async (req, res) => {
    const result = await AuthService.LogoutUser(req.user._id)
    sendSuccessMessage(res, 200, "User Logout successfully", null)
  }
}