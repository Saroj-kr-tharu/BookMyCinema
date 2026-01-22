const paymentTransactionService = require('./PaymentTransactionService');
const { MOVIE_BOOKING_URL } = require('../config/serverConfig');
const { STRIPE_FAILED_URL, STRIPE_SUCCESS_URL } = require('../config/stripeConfig');
const stripe = require('../config/stripeConnect');
const rabbitMqService = require('../Utlis/messageQueue');

class StripeService {


    async intializePaymentService(data) {
        try {
            // 1. initialize-stripe

            // -> create session 
            // const quan= data.items.length;
            // console.log('data item => ', data.items.map(item ));
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: data.items.map(item => {
                    return {
                        price_data: {
                            currency: "npr",
                            product_data: {
                                name: item.seatNumber,
                            },
                            unit_amount: item.Price*100,
                        },
                        quantity: 1
                    }
                }),
                success_url: `${STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}&transId=${data.transactionId}`,
                cancel_url: `${STRIPE_FAILED_URL}?session_id={CHECKOUT_SESSION_ID}`,
            })

            // console.log('session => ', session);

            // -> create Record at transitionTable 
            const transactionId = await session.id;
            let finalData = { userId: data.userId, amount: data.amount,userEmail:data.userEmail, status:'PENDING', currency: 'USD', transactionId, paymentMethod: "STRIPE" };
            await paymentTransactionService.createService(finalData);


            return session.url





        } catch (error) {
            console.log("Something went wrong in service layer (intializePaymentService)");
            throw error;
        }
    }

    async #checkPaymentStatus(sessionId,transId) {
        try {
            // Retrieve the session details using the session ID
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            // Check the payment status
            const paymentStatus = session.payment_status; // Possible values: 'paid', 'unpaid', 'no_payment_required'

            return paymentStatus;
        } catch (error) {
            console.log("Something went wrong in service layer (checkPaymentStatus)");
            throw error;
        }
    }

    async completePaymentService(data,transactionId) {
        try {

            // 
            const response = await this.#checkPaymentStatus(data);
            console.log('response => ', response);

            // check the status 
            if (response != 'paid') return;

            // update status 
            await paymentTransactionService.updateByTransId(data, { status: 'SUCCESS' });

            // send queue to send msg to remainder service 
            // -> transition id , amount , date , gateway , email_status
            const getdata = await paymentTransactionService.getDetailsByTransid(data);

            const payload = {
                subject: "Payment Notification System",
                email: getdata.userEmail,
                notificationTime: new Date(),
                gateway: 'Stripe',
                transactionId: data,
                amount: getdata.amount,
                currency: 'usd',
                status: 'COMPLETE'
            };
            const res = await rabbitMqService.sendMessageToQueueService(payload);
            // Respond with success message
            const link = `${MOVIE_BOOKING_URL}/FinalComplete?transId=${encodeURIComponent(transactionId)}`
            return link;






        } catch (error) {
            console.log("Something went wrong in service layer (completePaymentService)");
            throw error;
        }
    }


    async failedPaymentService(data) {
        try {

            // 
            const response = await this.#checkPaymentStatus(data);
            // console.log('response => ', response);

            // check the status 
            if (response != 'unpaid') return;

            // update status 
            await paymentTransactionService.updateByTransId(data, { status: 'FAILED' });
            // send queue to send msg to remainder service 
            // -> transition id , amount , date , gateway , email_status
            const getdata = await paymentTransactionService.getDetailsByTransid(data);

            const payload = {
                subject: "Payment Notification System",
                email: getdata.userEmail,
                notificationTime: new Date(),
                gateway: 'Stripe',
                transactionId:getdata.transactionId,
                amount: getdata.amount,
                currency: 'usd',
                status: 'FAILED'
            };
            const res = await rabbitMqService.sendMessageToQueueService(payload);
            // Respond with success message
            return res;


        } catch (error) {
            console.log("Something went wrong in service layer (completePaymentService)");
            throw error;
        }
    }


}



const stripeService = new StripeService();

module.exports = stripeService;