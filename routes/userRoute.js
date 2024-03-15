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

//ADD/UPDATE PROFILE PICTURE
router.patch(
  "/updateMe",
  authController.protect, //allows access to the logged in users.
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

module.exports = router;
