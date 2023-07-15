const colors = require("colors");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

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
    });
  }
};

module.exports = { registerController };
