const { ClientErrorsCodes, ServerErrosCodes } = require('../Utlis/ServerCodes');

class PaymentTransactionValidation {

    create(req, res, next) {
        const { userId, paymentMethodId, currency, amount, paymentMethod } = req.body;

        if (!userId || !paymentMethodId || !currency || !amount || !paymentMethod) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for create PaymentTransaction',
                err: 'Missing mandatory properties to create for a PaymentTransaction'
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
                message: 'Invalid request  for update PaymentTransaction',
                err: 'Missing mandatory properties to update for a PaymentTransaction'
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
                message: 'Invalid request  for delete PaymentTransaction',
                err: 'Missing mandatory properties to delete for a PaymentTransaction'
            });
        }
        next();
    }


}

const paymentTransactionValidation = new PaymentTransactionValidation();
module.exports = paymentTransactionValidation;