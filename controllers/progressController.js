const  ProgressModel = require('../models/progressModel');
const UserModel = require('../models/userModel')
const courseModel = require('../models/courseModel')

exports.Progress = async (req, res, next) =>{
    const userId = req.user.id;
    const courseId = req.body;

    //Validating if the user and course exsit 
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    //Creating the record 
    const progress = await Progress.create({user: userId, course: courseId,});
    res.status(200).json({ status: 'success',  data: progress});
}