const express = require("express");
const authController = require("../controllers/authController");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.get("/", authController.protect, courseController.getAllCourse);

router.get("/:id", authController.protect, courseController.getCourse);

module.exports = router;
