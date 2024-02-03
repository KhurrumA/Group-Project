//const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.registerUser); //only post data so that new user can be created
router.post("/login", authController.login);
// router.get("/logout", authController.logout); //logout route

module.exports = router;
