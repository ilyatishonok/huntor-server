const Booking = require('../models/booking.model');

exports.getVisibleEvents = async (req, res, next) => {
    const utcStartDate = moment.utc(new Date(req.params.startDate)).toDate();
    const utcLastDay = moment.utc(new Date(req.params.lastDate)).toDate();

    Booking.find({
        [req.user.role]: req.user.id,
        $and: [
            {
                startDate: {
                   $gte: utcStartDate,
                } 
            },
            {
                endDate: {
                    $lte: {
                        utcLastDay,
                    },
                },
            },
        ],
    })
}