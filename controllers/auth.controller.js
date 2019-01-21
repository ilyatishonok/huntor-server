const jwt = require('jsonwebtoken');
const _ = require('underscore');
const { User } = require('../models/user.model');
const validateOnLogin = require('../utils/validateOnLogin');

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
        });
    } catch (err) {
        next(err);
    }
}

exports.refreshToken = async (req, res, next) => {
}

exports.login = async (req, res, next) => {
    try {
        const errors = validateOnLogin(req.body);

        if (!_.isEmpty(errors)) {
            return res.status(400).json({
                errors,
                success: false,
            });
        }

        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
    
        if (!user) {
            return res.status(404).json({
                error: 'User with this email and password not found',
                success: false,
            });
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
        }

        const token = jwt.sign(payload, 'secretKey', {
            expiresIn: 900,
        });
        const refreshToken = jwt.sign(payload, 'secretKey', {
            expiresIn: 30000,
        });

        res.status(200).json({
            success: true,
            token,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
}