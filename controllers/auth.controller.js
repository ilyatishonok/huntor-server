const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const validateUser = require('../utils/validateUser');

exports.signUp = async (req, res, next) => {
    try {
        const validation = await validateUser(req.body);

        if (!_.isEmpty(validation)) {
            return res.status(400).json({
                errors: validation,
            });
        }

        const user = await User.create({...req.body});

        const payload = {
            id: user.id,
            name: user.name,
        }

        const token = jwt.sign(payload, 'secretKey', {
            expiresIn: 900,
        });

        res.status(200).json({
            token,
            message: 'User was created sucessfully',
            validation,
        });
    } catch (err) {
        next(err);
    }
}

exports.refreshToken = async (req, res, next) => {
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            name: req.body.name,
            passwordHash: req.body.passwordHash,
        });
    
        if (!user) {
            res.status(401).json({
                message:"no such user found"
            });
        }

        const token = jwt.sign({ id: user.id, name: user.name}, 'secretKey', {
            expiresIn: 900,
        });
        const refreshToken = jwt.sign({ id: user.id, name: user.name}, 'secretKey', {
            //More expires in
        });

        res.status(200).json({
            message: 'completed',
            token,
        })
    } catch (err) {
        next(err);
    }
}