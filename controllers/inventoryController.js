const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const colors = require("colors");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
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
    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedBloodQuantity = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      // Calculate OUT blood record
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
    } else {
      req.body.donar = user?._id;
    }
    const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
    const availableQuantityOfBloodGroup = totalIn - totalOut;

    if (availableQuantityOfBloodGroup < requestedBloodQuantity) {
      return res.status(404).json({
        success: false,
        message: `Only ${availableQuantityOfBloodGroup}ml  of ${requestedBloodGroup.toUpperCase()} Blood is Available`,
      });
    }
    req.body.hospital = user?._id;
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

// Get All blood record
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "get All records successfully",
      inventory,
    });
  } catch (error) {
    console.log(
      `Error Occur with getInventoryController :${error} `.bgRed.white
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong..",
      error,
    });
  }
};
// Get Hospital blood record
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filter)
      .populate("donar")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(
      `Error Occur with getInventoryController :${error} `.bgRed.white
    );
    return res.status(500).json({
      success: false,
      message: "Something went wrong..",
      error,
    });
  }
};

// get Top 3 Records
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organization: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Recent Inventory Data",
      inventory,
    });
  } catch (error) {
    console.log("Error occur with getRecentInventoryController".bgRed.white);
    return res.status(500).json({
      success: false,
      message: "Something went wrong...",
      error,
    });
  }
};
// Get Donar Record
const getDonarController = async (req, res) => {
  try {
    const organization = req.body.userId;
    const donarId = await inventoryModel.distinct("donar", {
      organization,
    });
    const donars = await userModel.find({ $id: { $in: donarId } });
    return res.status(200).json({
      success: true,
      message: "Donars Are Successfully fetched...",
      donars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong..",
      error,
    });
  }
};

// Get Hospital Records
const getHospitalController = async (req, res) => {
  try {
    const organization = req.body.userId;
    const hospitalId = await inventoryModel.distinct("hospital", organization);
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).json({
      success: true,
      message: "Hospital Data fetch successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong...",
      error,
    });
  }
};

const getOrganizationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { donar });
    const organizations = await userModel.find({ _id: { $in: orgId } });
    return res.status(200).json({
      success: true,
      message: "Organization details are fetched successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong...",
      error,
    });
  }
};
const getOrganizationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organization", { hospital });
    const organizations = await userModel.find({ _id: { $in: orgId } });
    return res.status(200).json({
      success: true,
      message: "Organization details are fetched successfully",
      organizations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong...",
      error,
    });
  }
};
module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
