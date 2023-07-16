const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  createInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// routes
router.post("/create-inventory", authMiddlewares, createInventoryController);

module.exports = router;
