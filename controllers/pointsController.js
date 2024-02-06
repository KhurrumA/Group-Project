const User = require('../models/userModel');
const Course = require("../models/courseModel");
const AppError = require('../utils/appError');

exports.addPoints = async (req, res, next) => {
    const {courseId } = req.params.id; //assuming given
    //console.log(req.body)

    // getting the course points from the Course model
    const course = await Course.findById(courseId);
    console.log(course);

    if (!course) { 
      return next(new AppError('Course not found', 404))
    }

    // Adding course points to user's points in the database
    const user = await User.findByIdAndUpdate(
      user._id,
      { $inc: { points: course.points } },
      { new: true }
    );
    res.status(200).json({ status: "success", data: {user}});

};