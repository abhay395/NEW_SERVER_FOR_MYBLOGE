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
    featchUserBloge:async (filter, option)=>{
        try {
            const result = await Blog.paginate(filter, option);
            return result;
        } catch (error) {
            throw error;
        }
    },
    updateUser:async (data,id)=>{
        try {
            
            const result = await User.updateOne({ _id: id }, data);
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