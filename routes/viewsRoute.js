const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

//RENDERING pug file
router.get("/", authController.isLoggedIn, viewsController.getLanding);
router.get("/account", authController.protect, viewsController.getUserAccount);
router.get("/dashboard", authController.protect, viewsController.dashboard);
router.get("/courses", authController.protect, viewsController.getCourses);
router.get("/course/:slug", authController.protect, viewsController.getCourse);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);
router.get("/signup", viewsController.getSignupForm);
router.get("/review/:slug", authController.protect, viewsController.postReview);
router.get(
  "/ibmCourse/:slug",
  authController.protect,
  viewsController.getCourseOverview
);
// Get top 3 courses
router.get(
  "/top-3-courses",
  authController.protect,
  viewsController.getCourses
);
//Upload picture form
router.get(
  "/account/uploadPhoto",
  authController.protect,
  viewsController.getUploadPhoto
);
//Upload picture
router.patch(
  "/account/uploadPhoto",
  authController.protect,
  viewsController.uploadPhoto
);
router.get(
  "/friendsLeaderboard",
  authController.protect,
  viewsController.friendsLeaderboard
);

//ADMIN

//Get dashboard
router.get(
  "/admin-dashboard",
  authController.protect,
  authController.restrictTo("admin"),
  viewsController.adminDashboard
);

//Get account
router.get(
  "/admin",
  authController.protect,
  authController.restrictTo("admin"),
  viewsController.getAdminAccount
);

//Get all comments
router.get(
  "/admin/comments",
  authController.protect,
  authController.restrictTo("admin"),
  viewsController.getAllReviews
);

//Delete review
router.delete(
  "/reviews/:id",
  authController.protect,
  authController.restrictTo("admin"),
  viewsController.deleteReview
);

//Get the courses and details
router.get("/admin/courses", viewsController.adminCourses);

module.exports = router;
