const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

//UPDATE/EDIT Review/Course
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //new updated document will be returned
      runValidators: true,
    });

    if (!doc) {
      return next(new appError("No documents found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

//CREATE/POST Review/Course
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body); //create new document with the data passed through the body

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    }); //201 = created new resource
  });

// READING ALL Reviews/Course/Users
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.courseId) filter = { course: req.params.courseId };

    const doc = await Model.find(filter);

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });