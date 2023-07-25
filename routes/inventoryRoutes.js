const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
} = require("../controllers/inventoryController");

const router = express.Router();

// routes

// Create Inventory || POST
router.post("/create-inventory", authMiddlewares, createInventoryController);

// Get Blood Record || GET
router.get("/get-inventory", authMiddlewares, getInventoryController);

// Get Donar Record || GET
router.get("/get-donars", authMiddlewares, getDonarController);

// Get Donar Record || GET
router.get("/get-hospital", authMiddlewares, getHospitalController);

module.exports = router;
