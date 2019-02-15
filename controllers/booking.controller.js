const moment = require('moment');
const Booking = require('../models/booking.model');

exports.createBooking = async (req, res, next) => {
    try {
        const selectedDateString = req.body.selectedDate;
        const selectedDate = new Date(selectedDateString);
        const startDate = moment(selectedDate).utc().startOf('day').add(req.body.startDate, 'm');
        const endDate = moment(selectedDate).utc().startOf('day').add(req.body.startDate + req.body.endDate, 'm');

        const booking = await Booking.create({
            startDate,
            endDate,
            student: req.user.id,
            tutor: req.body.id,
            message: req.body.message,
            subject: req.body.subject,
        });

        res.status(200).json({
            success: true,
            booking,
        });
    } catch (err) {
        next(err);
    }
}

exports.getTutorBookings = async (req, res, next) => {
    try {
        const dateFormat = new Date(req.query.day);

        const endOfDay = moment(dateFormat).endOf('day');

        const utcStartOfDay = moment.utc(dateFormat).toDate();
        const utcEndOfDay = moment.utc(endOfDay).toDate();

        const bookings = await Booking.find({
            tutor: req.params.id,
            $or: [
               { $and: [
                   {
                        startDate: {
                            $gte: utcStartOfDay,
                        }
                   },
                   {
                        startDate: {
                            $lte: utcEndOfDay,
                        }
                   }
                ] },
               { $and: [
                   {
                        endDate: {
                            $gte: utcStartOfDay,
                        }
                   },
                   {
                        endDate: {
                            $lte: utcEndOfDay,
                        }
                   }
               ] }
            ],
        });

        res.status(200).json({
            success: true,
            bookings,
        });
    } catch(err) {
        next(err);
    }
}

exports.getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({
            [req.user.role]: req.user.id,
        });

        res.status(200).json({
            success: true,
            bookings,
        });
    } catch(err) {
        next(err);
    }
}

exports.getMyBookingsByDay = async (req, res, next) => {
    try {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);

        const utcStartOfInterval = moment.utc(moment(startDate).startOf('day')).toDate();
        const utcEndOfInterval = moment.utc(moment(endDate).endOf('day')).toDate();

        const bookings = await Booking.find({
            [req.user.role]: req.user.id,
            $or: [
               { $and: [
                   {
                        startDate: {
                            $gte: utcStartOfInterval,
                        }
                   },
                   {
                        startDate: {
                            $lte: utcEndOfInterval,
                        }
                   }
                ]},
               { $and: [
                   {
                        endDate: {
                            $gte: utcStartOfInterval,
                        }
                   },
                   {
                        endDate: {
                            $lte: utcEndOfInterval,
                        }
                   }
               ] }
            ],
        }).populate({
            path: 'tutor',
            select: 'firstname lastname middlename role',
            populate: {
                path: 'tutoring',
                populate: {
                    path: 'subjects',
                    populate: {
                        path: 'questions',
                    },
                },
            },
        }).populate({
            path: 'student',
            select: 'firstname lastname middlename role'
        });

        res.status(200).json({
            success: true,
            bookings,
        });
    } catch(err) {
        next(err);
    }
}