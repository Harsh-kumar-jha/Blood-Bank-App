const colors = require("colors");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    // Validation
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "The user is already exist",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    // rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).json({
      success: true,
      message: "The user has been registered successfully...",
    });
  } catch (error) {
    console.log(`Error occur at registerController : ${error}`.bgRed.white);
    res.status(500).json({
      success: false,
      message: "There is Some internal Error will Resolve it soon...",
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const comparePassword = await bcrypt.compare(
      req,
      body.password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(500).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      existingUser,
    });
  } catch (error) {
    console.log(`Error occur at loginController : ${error}`.bgRed.white);
    res.status(500).json({
      success: false,
      message: "Something went wrong internally we get back to you shortly",
      error,
    });
  }
};

// get current user
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(`Error occur at currentUserController : ${error}`);
    return res.status(500).json({
      success: false,
      message: "There is some internal error",
      error,
    });
  }
};
module.exports = { registerController, loginController, currentUserController };
