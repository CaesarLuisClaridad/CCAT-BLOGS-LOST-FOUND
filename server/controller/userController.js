const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//creating a token for the user
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login method function
const userLogIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Ensure that the user object contains the required information (including username)
    if (!user || !user.username) {
      throw new Error("Invalid login credentials");
    }

    //create token
    const token = createToken(user._id);
    res.status(200).json({
      email,
      token,
      username: user.username,
      password,
      gender: user.gender,
      profilePicture: user.profilePicture,
      id: user._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup method function
const userSignUp = async (req, res) => {
  const { username, email, password, confirmPassword, gender, profilePicture } = req.body;

  console.log("Received signup request:", {
    username,
    email,
    password,
    confirmPassword,
    gender,
    profilePicture,
  });

  try {
    const user = await User.signup(
      username,
      email,
      password,
      confirmPassword,
      gender,
      profilePicture
    );

    //create token
    const token = createToken(user._id);
    res.status(200).json({
      username,
      email,
      token,
      gender: user.gender,
      profilePicture: user.profilePicture,
      id: user._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//edit information

const editInformation = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ error: "Error editing information" });
  }

  const token = createToken(user._id);

  res.status(200).json({
    email: user.email,
    token,
    username: user.username,
    gender: user.gender,
    profilePicture: user.profilePicture,
    id: user._id,
  });
};

//updating password

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.params;

  //check if the current and new password is filled up
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ mssg: "Provide both current and new password" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ mssg: "User not found" });
    }

    //verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(404).json({ mssg: "Current password is incorrect" });
    }

    //check if the new password is not same with the old password
    if (currentPassword === newPassword) {
      return res
        .status(404)
        .json({ mssg: "New password must be different from current password" });
    }

    //hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    //update and save new password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(404).json({ error: "Error updating password" });
  }
};


//finding user in forgot password
const findUser = async (req, res) => {
  const { email, username } = req.body;

  if(!email || !username){
    return res.status(404).json({mssg: "All fields are required!"})
  }

  try {
    const user = await User.findOne({ email, username });

    if (!user) {
      return res.status(404).json({ mssg: "User not found!" });
    } else{
      //user found
      return res.status(200).json({
          message: "User found",
          userId: user._id,
          email: user.email,
          username: user.username,
        });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ mssg: "An error occurred while finding the user" });
  }
};

//creating new password after the user has been found in the database
const initiatePasswordReset = async (req, res) => {
    const {newPassword, confirmNewPassword } = req.body;
    const {id} = req.params;

    if(newPassword !== confirmNewPassword) {
      return res.status(400).json({mssg: "Password dont match!"})
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findByIdAndUpdate(id, {password: newHashedPassword})
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
         return res.status(200).json({ message: "Password updated successfully" });
        }

    catch (error) {
      console.error(error); 
      return res.status(500).json({ message: "An error occurred while updating the password" });
    }
  }


module.exports = {
  userSignUp,
  userLogIn,
  editInformation,
  updatePassword,
  findUser,
  initiatePasswordReset,
};
