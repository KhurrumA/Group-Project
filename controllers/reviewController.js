const Review = require("../models/reviewModel");
const functionFactory = require("./functionHandlers");

exports.updateReview = functionFactory.updateOne(Review);
exports.createReview = functionFactory.createOne(Review);
exports.getAllReviews = functionFactory.getAll(Review);
exports.getReview = functionFactory.getOne(Review);
exports.setCourseUserIds = (req, res, next) => {
  if (!req.body.course) req.body.course = req.params.courseId;
  // if no used add the user id
  if (!req.body.user) req.body.user = req.user.id;
  next();
};