const Post = require("../models/Post");

const router = require("express").Router();

//add post
router.post("/add", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(200).json({ status: true, message: "Post added successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update post
router.put("/update/:id", async (req, res) => {
  try {
    Post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(
      () => {
        res.status(200).json({
          status: true,
          message: "Post data updated successfully!.",
        });
      }
    );
  } catch (error) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await Post.findOne({ _id: req.params.id });
    if (user) {
      Post.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res.status(200).json({ status: true, message: "Post Deleted " });
      });
    } else {
      res
        .send(200)
        .json({ status: false, message: "Post not found with this ID" });
    }
  } catch (error) {
    res.send(500).json(error);
  }
});

//get post detail by id
router.get("/getPost/:id", async (req, res) => {
  try {
    const isUser = await Post.findOne({ _id: req.params.id });
    isUser &&
      res.status(200).json({
        status: true,
        message: "post fetch successfully",
        data: isUser,
      });
    !isUser &&
      res.status(200).json({
        status: false,
        message: "post not found",
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all posts
router.get("/get", (req, res) => {
  Post.find()
    .then((user) => {
      res.status(200).json({
        status: true,
        message: "users fetch successfully",
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//get all post of any user
router.get("/get/:id", (req, res) => {
  Post.find({ userId: req.params.id })
    .then((user) => {
      res.status(200).json({
        status: true,
        message: "users fetch successfully",
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//like post
router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    let isLiked = false;
    post.likes.map((item) => {
      if (item == req.body.userId) {
        isLiked = true;
      }
    });
    if (isLiked) {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.body.userId } }
      );
      res
        .status(200)
        .json({ status: false, message: "unlike post successfully" });
    } else {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $push: { likes: req.body.userId } }
      );
      res
        .status(200)
        .json({ status: false, message: "like post successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
