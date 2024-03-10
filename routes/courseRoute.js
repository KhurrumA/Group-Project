const express = require("express");
const authController = require("../controllers/authController");
const courseController = require("../controllers/courseController");
const progressController = require("../controllers/progressController");
const pointsController = require("../controllers/pointsController");

const router = express.Router(); //creating the router

router.get("/", authController.protect, courseController.getAllCourse); //home route

router.get("/top-3-courses", authController.protect, courseController.getTop3Courses); // Get top 3 courses

router.get("/:id", authController.protect, courseController.getCourse); //get one course

router.post(
  "/start/:courseId",
  authController.protect,
  progressController.progressStart
);

router.patch(
  "/complete/:courseId",
  authController.protect,
  progressController.progressComplete
);

module.exports = router;
