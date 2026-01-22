const paymentTransactionService = require('../Services/PaymentTransactionService');
const { ServerErrosCodes, SucessCode } = require('../Utlis/ServerCodes');

class paymentTransactionController {

    async create(req, res) {
        try {
            const { userId, paymentMethodId, currency, amount, paymentMethod } = req.body;
            const data = {
                userId, paymentMethodId, currency, amount, paymentMethod
            }
            const result = await paymentTransactionService.createService(data);

            return res.status(SucessCode.CREATED).json({
                message: "Successfully to Create a PaymentMethods ",
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

            const id = req?.query?.id;
            const data = req.body;

            const result = await paymentTransactionService.updateService(id,data);
            return res.status(SucessCode.OK).json({
                message: "Successfully to Update a Payment ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update a paymentMethod",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async delete(req, res) {
        try {

            const id = req?.query?.id;

            const result = await paymentTransactionService.deleteService(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to delete a paymentMethod ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete a paymentMethod",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async get(req, res) {
        try {

            const id = req?.query?.id;
            const result = await paymentTransactionService.getByidService(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to get a paymentMethod ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get a paymentMethod",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async getALL(req, res) {
        try {

            const result = await paymentTransactionService.getAllService();

            return res.status(SucessCode.OK).json({
                message: "Successfully to get all Payment ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get all paymentMethod",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

}


const paymenttransactionController = new paymentTransactionController();

module.exports = paymenttransactionController;