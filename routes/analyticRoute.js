const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { getBloodData } = require("../controllers/analyticController");

const router = express.Router();

// routes

// Get blood data || GET
router.get("/bloodGroup-data", authMiddlewares, getBloodData);

module.exports = router;
