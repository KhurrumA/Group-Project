const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

//RENDERING pug file
router.get("/", authController.isLoggedIn, viewsController.getLanding);
router.get("/dashboard", authController.protect, viewsController.dashboard);
router.get("/courses", authController.protect, viewsController.getCourses);
router.get("/course/:slug", authController.protect, viewsController.getCourse);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
router.get("/signup", viewsController.getSignupForm);
router.get("/review/:slug", authController.protect, viewsController.postReview);
router.get(
  "/courseOverview/:slug",
  authController.protect,
  viewsController.getCourseOverview
);

module.exports = router;
