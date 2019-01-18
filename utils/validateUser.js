const UserModel = require('../models/user.model');

module.exports = async (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'This field is required';
    }

    if (!values.name) {
        errors.name = 'This field is required';
    }

    if (!values.password) {
        errors.password = 'This field is required';
    }

    if (!values.firstname) {
        errors.firstname = 'This field is required';
    }

    if (!values.lastname) {
        errors.lastname = 'This field is required';
    }

    if (!values.role) {
        errors.role = 'This field is required';
    } else {
        if (values.role !== 'Student' || values.role !== 'Tutor') {
            errors.role = 'Incorrect field value';
        }
    }

    if (!values.birthday) {
        errors.birthday = 'This field is required';
    }

    const user = await UserModel.findOne({$or: [{email: values.email}, {name: values.name}]});

    if (user) {
        errors._error = 'User with provided email or username is already exist';
    }

    return errors;
}