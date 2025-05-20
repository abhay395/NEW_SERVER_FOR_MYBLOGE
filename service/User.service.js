import User from "../models/User.model.js";
import Blog from "../models/Blog.model.js";


export default {
    featchUser:async (userId)=>{
        try {
            const result = await User.findById(userId).select('-password');
            return result;
        } catch (error) {
            throw error;
        }
    },
    featchUserBloge:async (userId)=>{
        try {
            const result = await Blog.find({userId}).populate('userId', 'name email image').select('-password');
            return {results:result};
        } catch (error) {
            throw error;
        }
    },
    updateUser:async (data,id)=>{
        try {
            const updateData = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    updateData[key] = data[key];
                }
            }
            const result = await User.findByIdAndUpdate(id, updateData, { new: true });
            return result;
        } catch (error) {
            throw error;
        }
    },
    deleteUser:async (id)=>{
        try {
            const result = await User.deleteOne({ _id: id });
            return result;
        } catch (error) {
            throw error;
        }
    }
}