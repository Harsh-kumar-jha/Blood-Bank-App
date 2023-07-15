const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

// routes
// Register || POST
router.post("/register", registerController);

// Login || POST
router.post("/login", loginController);

//Get Current User || GET
router.get("/current-user", authMiddlewares, currentUserController);
module.exports = router;
