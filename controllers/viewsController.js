const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Progress = require("../models/progressModel");

//USER

//User dashboard
exports.dashboard = catchAsync(async (req, res, next) => {
  //1) GET course DATA FROM COLLECTION
  const userId = req.user._id;

  const courses = await Course.find({ users: userId }).populate("users");
  console.log(courses._id);
  const progress = await Progress.find({
    user: userId,
  });

  //all course data will retrieved and passed to the template
  res.status(200).render("dashboard", {
    title: "Dashboard",
    courses,
    progress,
  });
});

//Get all the courses
exports.getCourses = catchAsync(async (req, res, next) => {
  const courses = await Course.find();

  const top3Courses = await Course.aggregate([
    {
      $lookup: {
        from: "progresses", // The collection to join
        localField: "_id", // Field from the courses collection
        foreignField: "course", // Field from the progresses collection matching localField
        as: "completedProgresses", // The array field name where the joined documents will be placed
      },
    },
    {
      $project: {
        name: 1,
        summary: 1,
        slug: 1,
        imageCover: 1,
        coursePoints: 1,
        completedCount: {
          $size: {
            $filter: {
              input: "$completedProgresses",
              as: "progress",
              cond: { $ne: ["$$progress.timeCompleted", null] }, // Only count progresses with a non-null timeCompleted
            },
          },
        },
      },
    },
    { $sort: { completedCount: -1 } }, // Sort by completedCount in descending order
    { $limit: 3 }, // Limit to the top 3
  ]);

  res
    .status(200)
    .render("courses", { title: "All courses", courses, top3Courses });
});

//Get specific course page
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

// Get login form
exports.getLoginForm = (req, res) => {
  console.log("I am in view controller");
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

//Get sign up form
exports.getSignupForm = (req, res) => {
  res.status(200).render("register", {
    title: "Register Now",
  });
};

//Get the landing page
exports.getLanding = (req, res) => {
  res.status(200).render("landing", {
    title: "Welcome",
  });
};

//Post review
exports.postReview = catchAsync(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  res.status(200).render("review", {
    title: "Review",
    course,
  });
});

//Get the course (Simulation)
exports.getCourseOverview = catchAsync(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug });
  res.status(200).render("ibmCourse", {
    title: course.name,
    course,
  });
});

//Get user account
exports.getUserAccount = (req, res) => {
  res.status(200).render("user/userAccount", {
    title: "Your account",
  });
};

//Get photo upload page
exports.getUploadPhoto = (req, res) => {
  res.status(200).render("user/updatePicture", {
    title: "Update Picture",
  });
};

//Upload picture
exports.uploadPhoto = catchAsync(async (req, res, next) => {
  console.log(req);
  if (req.file) {
    const user = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      user,
      {
        photo: req.file.filename,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).render("user/updatePicture", {
      title: "Upload Picture",
      user: updatedUser,
    });
  } else {
    next(new AppError("No file uplaoded", 400));
  }
});
// Friend leaderboard
exports.friendsLeaderboard = catchAsync(async (req, res, next) => {
  const userId = req.user._id; // Getting user id

  // Find the user with their friends' details populated
  const userWithFriends = await User.findById(userId).populate(
    "friends",
    "name points Rank"
  );

  if (!userWithFriends) {
    return next(new AppError("User not found", 404));
  }

  // Sorting the friends based on points in descending order
  const sortedFriends = userWithFriends.friends.sort(
    (a, b) => b.points - a.points
  );

  // Returning the sorted friends list, including their ranks
  res.status(200).render("user/friendsLeaderboard", { leaderboard: sortedFriends });

});
//View Friends
exports.friends = catchAsync(async (req, res, next) => {
  const userId = req.user._id; // Getting user id

  // Find the user with their friends' details populated
  const userWithFriends = await User.findById(userId).populate(
    "friends",
    "name Rank"
  );

  if (!userWithFriends) {
    return next(new AppError("User not found", 404));
  }
  // Returning the sorted friends list, including their ranks
  res.status(200).render("user/friends", { friend: userWithFriends.friends });

});

//ADMIN

//Admin Dashboard
exports.adminDashboard = catchAsync(async (req, res, next) => {
  res.status(200).render("admin/adminDashboard", {
    title: "Dashboard",
  });
});

//Get admin account
exports.getAdminAccount = (req, res) => {
  res.status(200).render("admin/adminAccount", {
    title: "Your account",
  });
};

//Get all the reviews
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find()
    .populate("user", "name")
    .populate("course", "name");
  res.status(200).render("admin/reviews", {
    title: "Reviews",
    reviews,
  });
});

//Delete Review
exports.deleteReview = async (req, res) => {};

exports.adminCourses = catchAsync(async (req, res, next) => {
  res.status(200).render("admin/adminCourses", {
    title: "Admin",
  });
});
