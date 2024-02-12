const mongoose = require("mongoose");
const Course = require("./courseModel");

//Creating the schema for the reviews
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      minLength: 3,
      maxLength: 500,
      required: [true, "Review cannot be empty"],
    },
    rating: {
      type: Number,
      default: 0,
      required: [true, "A rating must be given if you want to post a review"],
      min: [1, "The rating must be 1 or above"],
      max: [5, "The rating cannot be above 5"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "Review must belong to a course"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  }, //end of schema
  //start of optionals
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
