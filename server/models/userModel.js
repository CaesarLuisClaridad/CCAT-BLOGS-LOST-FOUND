const mongoose = require("mongoose");

//for login and signup
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

//user static signup method
userSchema.statics.signup = async function (
  username,
  email,
  password,
  confirmPassword,
  gender
) {
  console.log("Received signup request:", {
    username,
    email,
    password,
    confirmPassword,
    gender,
  });

  //check if the email and password are valid
  if (!username || !email || !password || !confirmPassword || !gender) {
    throw Error("All fields must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email must be a valid/strong email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password needs 8+ chars, including uppercase, lowercase, digits, symbols.");
  }

  if (password !== confirmPassword) {
    throw Error("Password dont match!");
  }

  //check if the email and password are already exist
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exists!");
  }

  const UsernameExists = await this.findOne({ username });

  if(UsernameExists) {
    throw Error("Username must be unique!");
  }

  //profilePic
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  //hashing the password, adding more secure characters
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    email,
    password: hash,
    gender,
    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
  });

  return user;
};

//User static login methods
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be fill!");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid password!");
  }

  console.log("Received signup request:", user);

  return user;
};

module.exports = mongoose.model("User", userSchema);
