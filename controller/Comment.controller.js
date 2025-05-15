import CommentService from "../service/Comment.service.js";
import { sendSuccessMessage } from "../utils/helper.js";
export default {
  getPostComment: async (req, res) => {
    const result = await CommentService.getPostComment(req.params.id);
    sendSuccessMessage(res, 200, "Fetch Post Comments successfully", result);
  },

  /**
   * Handles creating a comment for a post
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {string} req.body.postId - Post ID
   * @param {string} req.body.contente - Comment content
   * @returns {Promise<void>}
   */
  createComment: async (req, res) => {
    const data = {
      userId: req.user._id,
      postId: req.body.postId,
      contente: req.body.contente,
    };
    const result = await CommentService.createPostComment(data);
    sendSuccessMessage(res, 201, "Comment created successfully", result);
  },

  /**
   * Handles liking or disliking a comment
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {string} req.params.id - Comment ID
   * @param {boolean} req.body.isLike - Whether to like or dislike the comment
   * @returns {Promise<void>}
   */
  /**
   * Handles liking or disliking a comment
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {string} req.params.id - Comment ID
   * @param {boolean} req.body.isLike - Whether to like or dislike the comment
   * @returns {Promise<void>}
   */
  likeAddAndRemove: async (req, res) => {
    const data = {
      userId: req.user._id,
      isLike: req.body.isLike,
    };
    const result = await CommentService.likeAndDislike(req.params.id, data);
    sendSuccessMessage(
      res,
      200,
      "Comment Liked Or Dislike successfully",
      result
    );
  },
};