const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Progress = require("../models/progressModel");

exports.dashboard = catchAsync(async (req, res, next) => {
  //1) GET course DATA FROM COLLECTION
  const userId = req.user._id;
  const courseId = req.body.courseId;

  const courses = await Course.find({ users: userId }).populate("users");
  const progress = await Progress.find({ users: userId, course: courseId });
  console.log(progress);

  //all course data will retrieved and passed to the template
  res.status(200).render("dashboard", {
    title: "Dashboard",
    courses,
    progress,
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

exports.postReview = catchAsync(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  res.status(200).render("review", {
    title: "Review",
    course,
  });
});

exports.getCourseOverview = catchAsync(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  res.status(200).render("courseOverview", {
    title: course.name,
    course,
  });
});
