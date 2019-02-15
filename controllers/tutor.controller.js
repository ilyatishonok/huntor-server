const User = require('../models/user.model');
const Tutoring = require('../models/tutoring.model');
const TutorSubject = require('../models/tutor.subject.model');

/*exports.createTutorSubject = async (req, res, next) => {
    try {
        const tutorSubject = await TutorSubject.create({
            price: req.body.price,
            value: req.body.value,
        });

        const tutor = await Tutor.findOneAndUpdate({ _id: req.body.id }, 
            {
                '$push': {
                    'subjects': tutorSubject,
                },
            }
        );

        res.status(200).json({
            tutorSubject,
            tutor,
        });
    } catch(err) {
        next(err);
    }
}*/

exports.getTutors = async (req, res, next) => {
    try {
        const tutors = await User.find({
            role: 'tutor',
        })
            .populate('tutoring')
            .populate({
                path: 'tutoring.subjects',
                populate: {
                    path: 'questions',
                },
            });

        res.status(200).json({
            tutors,
        });
    } catch(err) {
        next(err);
    }
}

exports.getTutor = async (req, res, next) => {
    try {
        const tutor = await User.findOne({
            _id: req.params.id,
            role: 'tutor',
        }, 'firstname lastname middlename role').populate({
            path: 'tutoring',
            populate: {
                path: 'subjects',
                populate: {
                    path: 'questions',
                },
            },
        });

        if (!tutor) {
            return res.status(404).json({
                message: `Tutor with ${req.params.id} not found.`,
            });
        }

        return res.status(200).json({
            tutor: tutor,
        });
    } catch(err) {
        next(err);
    }
}

exports.getTutorSubjectsWithFilter = async (req, res, next) => {
    try {
        const tutor = await User.findOne({
            _id: req.params.id,
        }, 'subjects').populate({
            path: 'subjects',
            match: {
                value: new RegExp(`${req.query.filter}.*$`, 'i'),
            },
            select: 'value _id егещк',
        });

        if (!tutor) {
            return res.status(404).json({
                success: false,
                message: `Tutor with ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            success: true,
            subjects: tutor.subjects,
        });
    } catch(err) {
        next(err);
    }
}