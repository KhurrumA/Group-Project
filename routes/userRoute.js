const authController = require("./../controllers/authController");
const pointsController = require("./../controllers/pointsController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.registerUser); //post data so that new user can be created
router.post("/login", authController.login); //post data so we can authenticate the user
router.get("/logout", authController.logout); //logout route

router.get("/me/:id", authController.protect, pointsController.addPoints); //protecting the route so only the logged in user can see their points

module.exports = router;
