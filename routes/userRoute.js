const userController = require("../controllers/userController");
const authController = require("./../controllers/authController");
const pointsController = require("./../controllers/pointsController");
const express = require("express");

const router = express.Router();
//SIGNUP
router.post("/signup", authController.registerUser);
//LOGIN
router.post("/login", authController.login);
//LOGOUT
router.get("/logout", authController.protect, authController.logout); //the user can logout only if he is logged in

//ENROLL ME
router.post(
  "/enrollMe/:courseId",
  authController.protect,
  userController.enrollMe
);
//DASHBOARD
router.get("/dashboard", authController.protect, userController.getUserCourses);
//ADD POINTS
//router.get("/me/:id", authController.protect, pointsController.addPoints); //protecting the route so only the logged in user can see their points

module.exports = router;
