const Course = require("../models/courseModel");
const functionFactory = require("./functionHandlers");

exports.getAllCourse = functionFactory.getAll(Course);
exports.getCourse = functionFactory.getOne(Course);