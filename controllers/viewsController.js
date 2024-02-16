const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.dashboard = catchAsync(async (req, res, next) => {
  //1) GET cpurse DATA FROM COLLECTION
  const courses = await Course.find();
  //2) BUILD TEMPLATE

  //3) RENDER THAT TEMPLATE USING Course DATA FROM STEP 1

  //all course data will retrieved and passed to the template
  res.status(200).render("dashboard", {
    title: "Dashboard",
    courses,
  });
});

exports.getCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();

  res.status(200).render("courses", { title: "All courses", courses });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  //1) GET THE DATA including reviews and users
  const course = await Course.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });
  //NO COURSE ERROR HANDLING
  if (!course) {
    return next(new AppError("There is no course with that name", 404));
  }
  //2) BUILD TEMPLATE

  //3) RENDER TEMPLATE USING THE DATA FROM STEP 1
  res.status(200).render("course", {
    title: `${course.name} Course`,
    course,
  });
});

exports.getLoginForm = (req, res) => {
  console.log("I am in view controller");
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render("register", {
    title: "Register Now",
  });
};

exports.getLanding = (req, res) => {
  res.status(200).render("landing", {
    title: "Welcome",
  });
};
