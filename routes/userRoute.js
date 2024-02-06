//const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const pointsController = require("./../controllers/pointsController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.registerUser); //only post data so that new user can be created
router.post("/login", authController.login);
router.get("/logout", authController.logout); //logout route

router.get("/me/:id", pointsController.addPoints);

module.exports = router;
