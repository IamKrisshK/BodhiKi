const Posts = require("../models/Posts");
const Comments = require("../models/Comments");
const Likes  = require("../models/Likes");

const createPost = async (req,res,next)=>{
    try{
        const{title,content,category,tags} = req.body;
        const post = await Posts.create({
            author: req.user._id,
            title,
            content,
            category,
            tags
        });

        res.status(201).json(post);
    }
    catch (error){next(error);}
};

const getFeed = async(req,res, next)=>{
    try{
        const page=parseInt(req.query.page)||1;
        const limit=10;
        const skip=(page-1)*limit;
        const posts = await Posts.find().sort({createdAt:-1}).skip(skip).limit(limit).populate("author","username");
        res.status(200).json(posts);
    }

    catch(error){next(error);}
};

const delPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔒 Authorization check
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 🧹 Clean up related data
    await Comments.deleteMany({ post: postId });
    await Likes.deleteMany({ post: postId });

    // 🗑️ Delete post
    await Posts.deleteOne({ _id: postId });

    res.status(200).json({ message: "Post deleted" });

  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const existing = await Likes.findOne({
      user: req.user._id,
      post: postId,
    });

    if (existing) {
      // UNLIKE
      await Likes.deleteOne({ _id: existing._id });
      await Posts.findByIdAndUpdate(postId, { $inc: { likes: -1 } });

      return res.status(200).json({ message: "Unliked" });
    }

    // LIKE (safe)
    try {
      await Likes.create({
        user: req.user._id,
        post: postId,
      });

      await Posts.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

      return res.status(201).json({ message: "Liked" });

    } catch (err) {
      // 🔥 HANDLE DUPLICATE ERROR
      if (err.code === 11000) {
        return res.status(200).json({ message: "Already liked" });
      }
      throw err;
    }

  } catch (error) {
    next(error);
  }
};

const addComment = async(req,res,next)=>{
    try{
        const {postId} = req.params;
        const {body} = req.body;
        const comment = await Comments.create({
            author:req.user._id,
            post:postId,
            body
        });
        await Posts.findByIdAndUpdate(postId,{$inc:{comments:1}});
        res.status(201).json({message:"Commented!"});
    }
    catch(error){next(error);}
};

const delComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;

    const comment = await Comments.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Comments.deleteOne({ _id: commentId });

    await Posts.findByIdAndUpdate(postId, {
      $inc: { comments: -1 }
    });

    res.status(200).json({ message: "Deleted Comment!" });

  } catch (error) {
    next(error);
  }
};


const getComments = async(req,res,next)=>{
    try{
        const {postId} = req.params;
        const comments = await Comments.find({post:postId}).populate("author","username").sort({createdAt:-1});
        res.status(200).json(comments);
    }
    catch(error){next(error);}
};

module.exports = {createPost, getFeed, delPost, likePost, addComment, delComment, getComments};