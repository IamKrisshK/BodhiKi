const express = require("express");
const router = express.Router();
const {protect} = require("../mare/authMare");
const {createPost, getFeed, likePost, addComment, delComment, getComments} = require("../ctrl/userCtrl");

router.get("/profile", protect, (req, res) => {
  res.status(200).json(req.user);
});
router.post("/post", protect, createPost);
router.get("/feed", getFeed);
router.post("/:postId/like", protect, likePost);
router.post("/:postId/comment", protect, addComment);
router.post("/:postId/comment/:commentId", protect, delComment);
router.get("/:postId/comments", getComments);

module.exports = router;
