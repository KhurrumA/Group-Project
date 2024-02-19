const Progress = require("../models/progressModel");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.Progress = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const courseId = req.body.courseId;

  //Validating if the user and course exsit
  const user = await User.findById(userId);
  if (!user) {
    return next(new appError("User not found", 404));
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new appError("Course not found", 404));
  }
  //Creating the record
  const progress = await Progress.create({ user: userId, course: courseId });
  res.status(200).json({ status: "success", data: progress });

  // Creating the record with the current date and time as default for clickedAt
//  const time = await Progress.create({ user: userId, course: courseId });
 // time.timeCompleted = Date.now(); // Update the timeCompleted field with the current date and time
//  await time.save();
 // res.status(200).json({ status: "success", data: time });
});
