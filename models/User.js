const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    max: 50,
    require: true,
  },
  emailId: {
    type: String,
    max: 50,
    require: true,
    unique: true,
  },
  mobile: {
    type: String,
    max: 10,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    max: 50,
    require: true,
  },
  gender: {
    type: String,
    max: 50,
    // require: true,
  },
  dob: {
    type: String,
    max: 50,
  },
  address: {
    type: String,
    max: 50,
  },
  profilePic: {
    type: String,
    default: "",
  },
  coverPic: {
    type: String,
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
},{timestamps:true});

module.exports = mongoose.model("User",UserSchema);