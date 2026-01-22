const bookingService = require('../Services/booking-service');
const {  ServerErrosCodes, SucessCode } = require('../Utlis/ServerCodes');
const {  FORTEND_SUCESS_URL } = require('../Config/ServerConfig');

class bookingController {

    async create(req, res) {
        try {
            const { userId, showId, seats, totalPrice  } = req.body;
            const data = {
                userId, showId, seats, totalPrice
            }
            // console.log(data);
            const result = await bookingService.create(data);

            return res.status(SucessCode.CREATED).json({
                message: "Successfully to Create a Booking ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to Create a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }


    async update(req, res) {
        try {

            const data = {
                id: req?.query?.id,
                data: req.body
            }

            const result = await bookingService.update(data);

            return res.status(SucessCode.OK).json({
                message: "Successfully to Update a Booking ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async delete(req, res) {
        try {

            const id = req?.query?.id;
            const result = await bookingService.delete(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to delete a Booking ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async get(req, res) {
        try {

            const id = req?.query?.id;
            const result = await bookingService.get(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to get a Booking ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async getALL(req, res) {
        try {

            const result = await bookingService.getAll();

            return res.status(SucessCode.OK).json({
                message: "Successfully to get all Booking ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get all Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async bookingProcess(req, res) {
        try {

            const data = req.body;
            const result = await bookingService.bookingProcessService(data);
                console.log(result);
            return res.status(SucessCode.OK).json({
                message: "Successfully to get all Booking ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed Booking Process Controller ",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async bookingComplete(req, res) {
        try {

            const {transId} = req.query;
            // console.log( 'complete => ' ,transId);

            const result = await bookingService.bookingComplete(transId);
                // console.log(result);

            // return res.status(SucessCode.OK).json({
            //     message: "Successfully to Complete Booking ",
            //     success: true,
            //     data: result,
            //     err: {},
            // });

            res.redirect(`${FORTEND_SUCESS_URL}/${result.bookingId}`);
            
        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed Booking Process Controller ",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }
  

}


const booking = new bookingController();

module.exports = booking;