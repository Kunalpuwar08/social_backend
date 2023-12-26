const Comment = require("../models/Comment");

const router = require("express").Router();

//add comment
router.post("/add", async (req, res) => {
  try {
    const newComment = await Comment({
      comment: req.body.comment,
      postId: req.body.postId,
      userId: req.body.userId,
      username: req.body.username,
    });
    await newComment.save();
    res
      .status(200)
      .json({ status: true, message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
