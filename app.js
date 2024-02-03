const express = require("express");
const cookieParser = require("cookie-parser");
const expressLimit = require("express-rate-limit");
const helmet = require("helmet");
const expressSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("helmet");
const userRoute = require("./routes/userRoute");
const reviewRoute = require("./routes/reviewRoute");
const coursesRoute = require("./routes/courseRoute");

const app = express();

//ROUTES
app.use("/v1/users", userRoute);
app.use("v1/courses", coursesRoute);
app.use("v1/reviews", reviewRoute);

module.exports = app;
