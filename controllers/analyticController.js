const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

// Get Blood Group Details
const getBloodData = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    // get single blood Group Record
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // count number blood in
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup,
              inventoryType: "in",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        // count number blood out
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup,
              inventoryType: "out",
              organization,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availableBlood,
        });
      })
    );
    return res.status(200).json({
      success: true,
      message: "Blood Group data fetch successfully ",
      bloodGroupData,
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

module.exports = { getBloodData };
