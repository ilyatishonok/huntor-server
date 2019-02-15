const jwt = require('jsonwebtoken');
const _ = require('underscore');
const User = require('../models/user.model');
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

exports.refreshToken = async (req, res) => {
    jwt.verify(req.body.token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }

        const payload = {
            id: decoded.id,
            role: decoded.role,
            isAdmin: decoded.isAdmin,
        }

        const token = jwt.sign(payload, 'secretKey', {
            expiresIn: 900,
        });
        const refreshToken = jwt.sign(payload, 'secretKey', {
            expiresIn: 30000,
        });

        return res.status(200).json({
            token,
            refreshToken,
        });
    })
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

        console.log(user.toObject());

        const payload = {
            id: user.toObject()._id,
            role: user.toObject().role,
            isAdmin: user.isAdmin,
        }
        console.log(user['role']);
        console.log(user.isAdmin);
        console.log(payload);

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