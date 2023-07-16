const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// routes

// Create Inventory || POST
router.post("/create-inventory", authMiddlewares, createInventoryController);

// Get Blood Record || GET
router.get("/get-inventory", authMiddlewares, getInventoryController);

module.exports = router;
