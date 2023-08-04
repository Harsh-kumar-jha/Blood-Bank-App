const express = require("express");
const {
  getDonarListController,
  getOrganizationListController,
  getHospitalListController,
  deleteDonarController,
} = require("../controllers/adminController");
const authMiddlewares = require("../middlewares/authMiddlewares");
const adminMiddleware = require("../middlewares/adminMiddleware");

// router object
const router = express.Router();

// routes

// Get || All donar list
router.get(
  "/donar-list",
  authMiddlewares,
  adminMiddleware,
  getDonarListController
);

// Get || All hospital list
router.get(
  "/hospital-list",
  authMiddlewares,
  adminMiddleware,
  getHospitalListController
);

// Get || All Organization list
router.get(
  "/org-list",
  authMiddlewares,
  adminMiddleware,
  getOrganizationListController
);

// Delete || Donar
router.delete(
  "/deleteDonar/:id",
  authMiddlewares,
  adminMiddleware,
  deleteDonarController
);

// Delete || Hospital
router.delete(
  "/deleteHospital/:id",
  authMiddlewares,
  adminMiddleware,
  deleteDonarController
);

// Delete || Organization
router.delete(
  "/deleteOrg/:id",
  authMiddlewares,
  adminMiddleware,
  deleteDonarController
);

// export
module.exports = router;
