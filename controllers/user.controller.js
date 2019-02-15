const User  = require('../models/user.model');
const { wallet } = require('../models/wallet.model');

/*exports.createUser = async (req, res, next) => {
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
}*/

exports.getUserInfo = async (req, res, next) => {
    try {
        const user = await User.findOne({
            _id: req.user.id,
        }, 'role isAdmin firstname lastname subjects wallet')
            .populate({
                path: 'subjects',
                select: '-questions',
            })
            .populate({
                path: 'wallet',
                select: '-user',
            }).exec();
    
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with ${req.user.id} not found`,
            });
        }
    
        return res.status(200).json({
            success: true,
            user,
        });
    } catch(err) {
        next(err);
    }
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