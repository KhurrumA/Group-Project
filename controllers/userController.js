const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const functionFactory = require("./functionHandlers");
const Course = require("../models/courseModel");
const appError = require("../utils/appError");

exports.getUser = functionFactory.getOne(User);

// Enroll user in a course
exports.enrollMe = catchAsync(async (req, res, next) => {
  const { courseId } = req.params; //getting it from the url
  const { user } = req; //getting it from the req

  //console.log(req);

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new appError("Course not found", 404));
  }
  // Using map function to find the user
  const isUserEnrolled = await Promise.all(
    course.users.map(async (userId) => {
      const user = await User.findById(userId);
      return user !== null; // Returns true if user exists, false otherwise
    })
  );

  // Check if the user ID exists in the course's list of enrolled user IDs
  if (isUserEnrolled.includes(true)) {
    return next(new appError("User is already enrolled in this course", 400));
  } else {
    // Add user to the course's enrolled users list
    course.users.push(user._id);
    await course.save();
  }
  res.status(201).json({ status: "success", data: { course } });
});
