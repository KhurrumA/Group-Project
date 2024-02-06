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