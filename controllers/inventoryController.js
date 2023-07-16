const inventoryModel = require("../models/inventoryModel");

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    // Validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found..");
    }
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account..");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
    }
    // Save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).json({
      success: true,
      message: "New Blood record added",
    });
  } catch (error) {
    console.log(
      `There is error with Create Inventory Controller: ${error}`.bgRed.white
    );
    res.status(500).json({
      success: false,
      message: "Something went Wrong...",
      error,
    });
  }
};

module.exports = { createInventoryController };
