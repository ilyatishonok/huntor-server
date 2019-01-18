const Course = require('../models/course.model');

exports.getCourses = async (req, res, next) => {
    const page = req.query.page || 0;

    try {
        const result = await Course.paginate({}, {
            page: 1,
            populate: {
                path: 'tutor',
                select: 'name email',
            },
            limit: 10,
        });

        res.status(200).json({
            courses: result.docs,
            success: true,
        });
    } catch (err) {
        next(err);
    }
}

exports.createCourse = async (req, res, next) => {
    try {
        const course = await Course.create({ ...req.body });

        res.status(200).json(
            course
        );
    } catch (err) {
        next(err);
    }
}