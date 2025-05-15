import Comment from "../models/Comment.model.js";


export default {
    getPostComment: async (id) => {
        try {
            const result = await Comment.find({ postId: id })
                .sort({ createdAt: -1 })
                .limit(9)
                .populate("userId");
            return result
        } catch (error) {
            throw error
        }
    },
    createPostComment: async (data) => { 
        const result = await Comment.create(data)
        await result.populate("userId")
        return result
    },
    likeAndDislike: async (commentId, data) => { 
        const { userId, isLike } = data;
        const comment = await Comment.findById(commentId);
        
        const field = isLike ? 'likes' : 'disLikes';
        const operation = comment[field].includes(userId) ? '$pull' : '$addToSet';
        
        const result = await Comment.findByIdAndUpdate(
            commentId,
            { [operation]: { [field]: userId } },
            { new: true }
        );
        await result.populate("userId")
        return result;
    }
}