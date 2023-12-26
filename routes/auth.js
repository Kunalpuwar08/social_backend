const User = require("../models/User");

const router = require("express").Router();
const bcrypt = require("bcrypt");

//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      emailId: req.body.emailId,
      mobile: req.body.mobile,
      gender: req.body.gender,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    !user &&
      res.status(200).json({ status: false, message: "User not found!" });
    if (user) {
        const validPassword = await bcrypt.compare(req.body.password,user.password)
      if (validPassword) {
        res
          .status(200)
          .json({
            status: true,
            message: "Login User successfully",
            data: user,
          });
      }else{
        res
        .status(200)
        .json({
          status: false,
          message: "Wrong Password",
        });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
