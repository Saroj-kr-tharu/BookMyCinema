const { ClientErrorsCodes, ServerErrosCodes } = require('../Utlis/ServerCodes');

class bookingValidataion {

    create(req, res, next) {
        const { userId, showId, seats, totalPrice } = req.body;

        if (!userId || !showId || !seats || !totalPrice) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for create booking',
                err: 'Missing mandatory properties to create for a booking'
            });
        }
        next();
    }

    update(req, res, next) {
        const data = req.body;
        const id = req?.query?.id;


        if (!data || !id) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for update booking',
                err: 'Missing mandatory properties to create for a booking'
            });
        }
        next();
    }

    delete(req, res, next) {
        const id = req?.query?.id;
        if (!id) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for delete booking',
                err: 'Missing mandatory properties to delete for a booking'
            });
        }
        next();
    }



}


const bookingValidate = new bookingValidataion();

module.exports = bookingValidate;