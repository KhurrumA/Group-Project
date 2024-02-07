const express = require('express');
const  ProgressModel = require('models/progressModel');
const UserModel = require('models/userModel')
const courseModel = require('models/courseModel.js')

const router = express.Router();

router.post('/course-click', async (req, res) => {
    const { userId, courseId } = req.body; // Extract userId and courseId from the request body

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Create a new progress record
        const progress = await Progress.create({
            user: userId,
            course: courseId,
        });

        res.status(201).json({
            status: 'success',
            data: progress
        });
    } catch (error) {
        console.error('Error recording course click:', error);
        res.status(500).json({ message: 'Error recording the course click' });
    }
});