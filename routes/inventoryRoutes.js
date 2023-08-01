const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// routes

// Create Inventory || POST
router.post("/create-inventory", authMiddlewares, createInventoryController);

// Get Blood Record || GET
router.get("/get-inventory", authMiddlewares, getInventoryController);

// Get Recent Blood Record || GET
router.get(
  "/get-recent-inventory",
  authMiddlewares,
  getRecentInventoryController
);

// Get Hospital Blood Record || POST
router.post(
  "/get-inventory-for-hospital",
  authMiddlewares,
  getInventoryHospitalController
);

// Get Donar Record || GET
router.get("/get-donars", authMiddlewares, getDonarController);

// Get Hospital Record || GET
router.get("/get-hospital", authMiddlewares, getHospitalController);

// Get Organization Record || GET
router.get("/get-organization", authMiddlewares, getOrganizationController);

// Get Organization-for-hospital Record || GET
router.get(
  "/get-organization-for-hospital",
  authMiddlewares,
  getOrganizationForHospitalController
);

module.exports = router;
