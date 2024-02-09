const express = require("express");
const authController = require("../controllers/authController");
const courseController = require("../controllers/courseController");

const router = express.Router(); //creating the router

router.get("/", authController.protect, courseController.getAllCourse); //home route

router.get("/:id", authController.protect, courseController.getCourse); //get one course

module.exports = router;
