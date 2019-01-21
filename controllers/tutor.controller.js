const { Tutor } = require('../models/user.model');

exports.getTutors = async (req, res, next) => {
    if (req.user.role !== 'student') {
        return res.status(403).send('You have no permissions');
    }

    try {
        //const tutors = 
    } catch(err) {
        next(err);
    }
}