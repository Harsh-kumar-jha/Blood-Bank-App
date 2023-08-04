const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);
    // check admin
    if (!user?.role === "admin") {
      return res.status(401).json({
        success: false,
        message: "Auth Failed",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error occur at adminMiddleWare : ${error}`);
    return res.status(401).json({
      success: false,
      message: "You are not Authorized...",
      error,
    });
  }
};
