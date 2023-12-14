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
    const isUser = User.findById({ _id: req.params.id });
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

module.exports = router;
