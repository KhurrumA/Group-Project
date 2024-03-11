const Progress = require("../models/progressModel");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.progressStart = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const courseId = req.body.courseId;

  try {
    // Find the progress document based on the user and course IDs
    let progress = await Progress.findOne({ user: userId, course: courseId });
    console.log(progress);

    if (!progress) {
      // If progress document doesn't exist, create a new one
      progress = await Progress.create({
        user: userId,
        course: courseId,
        timeStart: new Date(), // Set the start time to the current date and time
      });
      console.log("Progress record created:", progress);
    } else {
      // If progress document exists but timeStart is not set, update it
      progress.timeStart = new Date();
      await progress.save();
    }

    res.status(200).json({ status: "success", data: progress });
  } catch (err) {
    // Handle any errors
    console.error("Error starting progress:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

const updateUserRank = async (userId) => {
  const user = await User.findById(userId);

  // Calculate new rank based on current points
  const newRank = Math.floor(user.points / 100);

  // Update user's rank
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { Rank: newRank },
    { new: true }
  );

  return updatedUser;
};
exports.progressComplete = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const courseId = req.body.courseId;

  // Find the relevant progress document
  const progress = await Progress.findOne({ user: userId });

  if (!progress) {
    return next(new appError("Progress not found", 404));
  }

  // Update the timeCompleted field to the current date and time
  progress.timeCompleted = new Date();

  // Save the updated progress document
  await progress.save();

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new appError("Course not found", 404));
  }

  // Adding course points to user's points in the database
  const userPoints = await User.findByIdAndUpdate(
    userId,
    { $inc: { points: course.coursePoints } },
    { new: true }
  );
  await updateUserRank(userId);

  res.status(200).json({ status: "success", data: { userPoints, progress } });

});
