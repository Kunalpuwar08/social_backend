const User = require("../models/User");

const router = require("express").Router();
const bcrypt = require("bcrypt");

//update
router.put("/update/:id", async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(
      () => {
        res.status(200).json({
          status: true,
          message: "user data updated successfully!.",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      User.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res.status(200).json({ status: true, message: "User Deleted " });
      });
    } else {
      res
        .send(200)
        .json({ status: false, message: "User not found with this ID" });
    }
  } catch (error) {
    res.send(500).json(error);
  }
});

//get User
router.get("/get", (req, res) => {
  User.find()
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

//get user by id
router.get("/getUser/:id", async (req, res) => {
  try {
    const isUser = await User.findOne({ _id: req.params.id });
    isUser &&
      res.status(200).json({
        status: true,
        message: "user fetch successfully",
        data: isUser,
      });
    !isUser &&
      res.status(200).json({
        status: false,
        message: "user not found",
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow
router.put("/follow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    let isFollowed = false;
    user?.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });

    if (isFollowed) {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "unfollow user successfully" });
    } else {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $push: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $push: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "followed user successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//unfollow
router.put("/unfollow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    let isFollowed = false;
    user.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });

    if (!isFollowed) {
      res
        .status(200)
        .json({ status: false, message: "you are not following this account" });
    } else {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: false, message: "unfollowed user successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
