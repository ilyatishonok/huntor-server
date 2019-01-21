const Subject = require('../models/subject.model');

exports.getSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find();

        res.status(200).json({
            subjects,
        });
    } catch(err) {
        next(err);
    }
}

exports.createSubject = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.sendStatus(403);
    }

    try {
        if (!req.body.title) {
            return res.status(400).send('Title is not provided');
        }

        const subject = await Subject.create({
            title: req.body.title,
        });

        return res.status(200).json({
            subject,
        });
    } catch(err) {
        next(err);
    }
}