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


//HANDLE DUPLICATE REVIEW
reviewSchema.index({ course: 1, user: 1 }, { unique: true });

//POPULATE Middleware
//The pre word means that this will be done before the data is saved in DB
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });

  next();
});

//CALCULATE AVERAGE RATING Middleware - Static methods
//calcAverageRatings is the name given to the function

reviewSchema.statics.calAverageRatings = async function (courseId) {
  const stats = await this.aggregate([
    {
      //1)Select all the reviews that have the same course ID
      $match: { course: courseId },
    },
    {
      //Calculate the statistics and group the reviews by course
      $group: {
        _id: "$course",
        nRating: { $sum: 1 }, //add 1 for each course matched
        average: { $avg: "$rating" }, //name of the field where you want to calculate the average from
      },
    },
  ]); //this points directly to the model and aggregate is always called on the model
  console.log(stats);
  if (stats.length > 0) {
    await Course.findByIdAndUpdate(courseId, {
      ratingsAverage: stats[0].average,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Course.findByIdAndUpdate(courseId, {
      ratingsAverage: 0,
      ratingsQuantity: 4.5,
    });
  }
};

reviewSchema.post("save", function () {
  //this points to the current review constructor is the model that created that document
  this.constructor.calAverageRatings(this.course);
});

//FindByIdAndUpdate/FindByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function (next) {
  //access the current review document
  //created the property on revi
  this.revi = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  //The query finished and review has been updated
  //this.revi is as the first post
  //await this.findOne(); does not work here, quert has already executed
  await this.revi.constructor.calAverageRatings(this.revi.course);
});