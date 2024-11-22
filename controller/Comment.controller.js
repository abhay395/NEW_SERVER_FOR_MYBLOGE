const { use } = require("passport");
const { Comment } = require("../models/Comment.model");
exports.getPostComment = async (req, res) => {
    const {id} = req.params
  
  try {
    const comments = await Comment.find({ postId: id }).sort({
      createdAt: -1,
    }).limit(9).populate("userId");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res) => {
  try {
    // console.log("req.body", req.body)
    const {contente,postId} = req.body
    const comment = new Comment({contente,postId,userId:req.user._id});
    const doc = await comment.save();
    // console.log("doc", doc);
    const result = await doc.populate("userId");
    return res.status(201).json({ comment: result });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.likeAddAndRemove=async(req,res)=>{
  try{
    const {id}=req.params
    // const {userId}=req.user
    console.log("id",id)
    const comment=await Comment.findOne({_id:id})
    const user=comment.likes.indexOf(req.user._id)
    // console.log("comment",comment)
    // console.log("comment.likes",req.user)
    if(user==-1){
      comment.likes.push(req.user._id)
      comment.numberOfLikes=comment.numberOfLikes+1
      comment.save()
      console.log(comment)
      res.status(200).json({numberOfLikes:comment.numberOfLikes,likes:comment.likes})
    }
    else{
        comment.likes.splice(user._id,1)
        comment.numberOfLikes=comment.numberOfLikes-1
        comment.save()
        res.status(200).json({numberOfLikes:comment.numberOfLikes,likes:comment.likes})
      }
      }catch(error){
        return res.status(400).json({error:error.message})
      }
}