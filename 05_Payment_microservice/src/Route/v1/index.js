const express = require("express");
const router = express.Router();
const path = require('path');

const {
    paymenttransactionController,
    eSewaController,
    khaltiController,
    stripeControllers
} = require('../../Controllers/index')

const {
    paymentTransactionValidation,
    eSewaValidation,
    khaltiValidation,
    stripeValidation
} = require('../../Middlewares/index')


router.get('/info', async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Welcome home',
            success: true,
            data: {},
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in v1/index.js routing ");
        // throw error;
        return res.status(500).json({
            message: 'Welcome home',
            success: true,
            data: {},
            err: {}
        });

    }
})



// router.post('/createPaymentTransaction', paymentTransactionValidation.create, paymenttransactionController.create);
// router.get('/getPaymentTransaction', paymentTransactionValidation.delete, paymenttransactionController.get);
// router.get('/getAllPaymentTransaction', paymenttransactionController.getALL);
// router.delete('/delPaymentTransaction', paymentTransactionValidation.delete, paymenttransactionController.delete);
// router.patch('/updatePaymentTransaction', paymentTransactionValidation.update, paymenttransactionController.update);

// router.get


// esewa 
router.get("/esewa", function (req, res) {
    const filePath = path.join(__dirname, '../../Utlis/test.html');
    res.sendFile(filePath);
});
router.post("/initialize-esewa", eSewaValidation.intilize, eSewaController.intilizeEsewa);
router.get("/complete-payment", eSewaValidation.completePayment, eSewaController.completePayment);


// khalti
router.post("/epayment/initiate/", khaltiValidation.intilize, khaltiController.intilizeKhalti);
router.get("/khalti/complete/payment", khaltiValidation.completePayment, khaltiController.completePayment);

//stripe
router.post("/stripe-initiate/", stripeValidation.intilize, stripeControllers.intilizeStripe);
router.get("/stripe-complete-payment", stripeValidation.completePayment, stripeControllers.completePayment);
router.get("/stripe-failed-payment", stripeValidation.completePayment, stripeControllers.failedPayment);



module.exports = router;