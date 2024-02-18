const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const functionFactory = require("./functionHandler");
const Course = require("../models/courseModel");
const appError = require("../utils/appError");

exports.getUser = functionFactory.getOne(User);

// Enroll user in a course
exports.enrollMe = catchAsync(async (req, res, next) => {
  const { courseId } = req.params; //getting it from the url
  const { user } = req; //getting it from the req

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new appError("Course not found", 404));
  }
  // Add user to the course's enrolled users list
  course.users.push(user._id);
  await course.save();

  res.status(201).json({ status: "success", data: { course } });
});
// Get courses enrolled by user
exports.getUserCourses = catchAsync(async (req, res, next) => {
  const { user } = req;
  console.log(user);
  // Find all courses where the user is enrolled
  const courses = await Course.find({ users: user._id });

  res.status(200).json({ status: "success", data: { courses } });
});
