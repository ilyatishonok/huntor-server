const { Student, Tutor } = require('../models/user.model');

exports.createUser = async (req, res, next) => {
    try {
        if (req.body.role === 'student') {
            const student = await Student.create({ ...req.body });
            
            return res.status(200).json({
                user: student,
            });
        } 

        if (req.body.role === 'tutor') {
            const tutor = await Tutor.create({ ...req.body });

            return res.status(200).json({
                user: tutor,
            });
        }
    } catch(err) {
        next(err);
    }
}

exports.getUser = (req, res) => {
    User.findById({ _id: req.params.id }, (err, product) => {
        if (err) {
            throw err;
        }
    
        if(!product) {
            res.sendStatus(404);
        }

        res.send(product);
    });
}

exports.validateEmail = (req, res) => {
    User.findOne({
        email: req.query.value,
    }, (err, user) => {
        if (err) {
            throw err;
        }

        res.status(200).json({
            exist: !!user,
        });
    })
}

exports.validateUsername = (req, res) => {
    User.findOne({
        name: req.query.value,
    }, (err, user) => {
        if (err) {
            throw err;
        }

        res.status(200).json({
            exist: !!user,
        })
    })
}