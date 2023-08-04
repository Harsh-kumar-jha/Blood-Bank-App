const userModel = require("../models/userModel");

// Fetching Donar list
const getDonarListController = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      TotalCount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
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

// Fetching  Hospital List
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      TotalCount: hospitalData.length,
      message: "Hospital List Fetched Successfully",
      hospitalData,
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

// Fetching Organization List
const getOrganizationListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organization" })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      TotalCount: orgData.length,
      message: "Organization List Fetched Successfully",
      orgData,
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

// Deleting Donar
const deleteDonarController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Donar Deleted successfully",
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
  getOrganizationListController,
  getDonarListController,
  getHospitalListController,
  deleteDonarController,
};
