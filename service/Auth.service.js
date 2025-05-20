import User from "../models/User.model.js";
import { createToken } from "../utils/helper.js";
import ApiError from "../utils/ApiError.js";
// import UnauthenticatedError from "../errors/unauthenticated.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
export default {
    createUser: async (reqBody) => {
        try {
            const user = new User(reqBody);
            await user.save();
            const token = createToken({ _id: user._id, email: user.email });
            return token
        } catch (error) {
            throw error
        }
    },
    LoginUser: async (data) => {
        try {
            const { email, password } = data
            const user = await User.findOne({ email });
            if (!user) {
                throw new ApiError(401, "Invalid credentials")
            }
            const passwordCheck = await bcrypt.compare(password, user.password);
            if (!passwordCheck) {
                throw new ApiError(401, "Invalid credentials");
            }
            await User.findByIdAndUpdate(user._id, { isActive: true });
            const token = createToken(user);
            return token
        } catch (error) {
            throw error
        }
    },
    LogoutUser: async (userId) => {
        const result = await User.findByIdAndUpdate(userId, { isActive: false })
        return result
    }
}