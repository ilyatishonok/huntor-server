const Education = require('../models/education.model');

exports.getEducations = async (req, res, next) => {
    try {
        const educations = await Education.find();

        res.status(200).json({
            educations,
        });
    } catch(err) {
        next(err);
    }
}

exports.createEducation = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.sendStatus(403);
    }

    try {
        if (!req.body.title) {
            return res.status(400).send('Title is not provided');
        }

        const education = await Education.create({
            title: req.body.title,
        });

        return res.status(200).json({
            education,
        });
    } catch(err) {
        next(err);
    }
}