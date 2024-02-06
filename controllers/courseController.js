const Course = require("../models/courseModel");
const functionFactory = require("./functionHandler");

exports.getAllCourse = functionFactory.getAll(Course);
exports.getCourse = functionFactory.getOne(Course);