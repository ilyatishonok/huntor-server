const User = require('../models/user.model');

exports.createUser = (req, res, next) => {
    const user = new User({...req.body});

    user.save(err => {
        if (err) {
            return next(err);
        }

        res.send('User was created successfully');
    })
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