const User = require("../models/userModel");
const Course = require("../models/courseModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addPoints = catchAsync(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  //const user = req;
  console.log(req.params.id);

  //console.log("this is user" + user);

  // getting the course points from the Course model
  //const courseA = courseId.tostring();
  const course = await Course.findById(courseId);
  console.log(course);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  // Adding course points to user's points in the database
  const userPoints = await User.findByIdAndUpdate(
    userId,
    { $inc: { points: course.coursePoints } },
    { new: true }
  );
  res.status(200).json({ status: "success", data: { userPoints } });
});
