const cron = require("node-cron");
const axios = require('axios');

const {
  getPendingMailService,
  updateNotificationService,
  deleteDataByStatusRepo,
  deleteService,
} = require("../Services/remainderService");

const {
  getPendingMailServicePayment,
  updateNotificationServicePayment,
  deleteDataByStatusRepoPayment,
  getPendingMailServiceTicket,
  updateNotificationServiceTicket,
  deleteDataByStatusRepoTicket

} = require("../Services/paymentNotiService");

const { Sender, } = require("../config/EmailConfig");
const { EMAIL_SENDER, FORGET_LINK, AUTH_SERVICE_URL } = require('../config/ServerConfig');

const { top10Movie, getUserAllCustumer } = require('../Services/UtilsService');

const {
  welcomeEmail,
  forgetEmail,

} = require("./Template/index");

const generatePaymentEmail = require('../utlis/Template/paymentTemplate/genPaymentTemplate')
const generateMovieListingEmailTemplate = require('./Template/movieTemplate/movieTemplate');
const generateTicketEmail = require('./Template/ticketConfirmTemplate/ticketConfirmTemplate');


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const setUptask = () => {

  cron.schedule("*/1 * * * * ", async () => {
    // every one minute

    try {
      console.log('Getting the pending data ');
      const response = await getPendingMailService();
      let link;
      let emailType;

      for (const email of response) {
        if (email.typeMail == "FORGET") {
          link = `${FORGET_LINK}?token=${email.token}`;
          emailType = forgetEmail(email.username, link);
        }


        if (email.typeMail == "WELCOME") {
          emailType = welcomeEmail(email.username);
        }

        let mailoption = {
          from: EMAIL_SENDER,
          to: email.recepientEmail,
          subject: email.subject,
          html: emailType,

        };

        console.log('Sending mail ...');
        Sender.sendMail(mailoption, async (error, data) => {
          if (error) {
            console.error("Failed To Send Email to: ", mailoption.to);
          } else {
            console.log("Email Successfully Sent to : ", data.envelope.to);


            await updateNotificationService(email.id, "SUCCESS");
          }

        });

        // Delay between sending emails to avoid rate limiting
        await delay(1000); // 1 second delay
        // await deleteService(email.id)
      }
    } catch (error) {
      console.log("Something Went wrong in job schedule");
      throw error;
    }
  });



  cron.schedule("*/2 * * * * ", async () => {
    // every two minute

    try {
      console.log("Deleteing the Sucess data at 2 minute   ...... ")
      await deleteDataByStatusRepo('SUCCESS');
      await deleteDataByStatusRepoPayment('SUCCESS');
      await deleteDataByStatusRepoTicket('SUCCESS');

    } catch (error) {
      console.log("Something Went wrong in job schedule", error);
      throw error;
    }
  });



  // getting top 10 movies 
  cron.schedule("10 * * * *", async () => {
    // every one minute

    try {
      console.log(" Getting top 10 Moives  ...... ")
      const resultMovie = await top10Movie();


      console.log(" Getting all user with role cusutmer ...... ")
      let users = await getUserAllCustumer();

      users.map((item) => {

        let mailoption = {
          from: EMAIL_SENDER,
          to: item.email,
          subject: 'Movie Feature',
          html: generateMovieListingEmailTemplate('Movie Lover', resultMovie),

        };

        // console.log("mailOption is = > ", mailoption);
        Sender.sendMail(mailoption, async (error, data) => {
          if (error) {
            console.error("Failed To Send Email to: ", mailoption.to);
          } else {
            console.log("Email Successfully Sent to : ", data.envelope.to);

          }

        });

      })

    } catch (error) {
      console.log("Something Went wrong in job schedule", error);
      throw error;
    }
  });


  // payment notification 
  cron.schedule("*/1 * * * * ", async () => {
    // every two minute

    try {
      console.log("geting unsent PaymentTransaction  at every 1 min   ...... ")
      // 1. get unsent data from the paymentTransactoin
      const alldata = await getPendingMailServicePayment();
      // console.log('all DAta => ',alldata);
      alldata.map(({ dataValues }) => {
        const {
          transitionId,
          amount,
          gateway,
          userEmail,
          notificationTime,
          id,
          payment_status,
          currency
        } = dataValues;


        const samplePaymentData = {
          userEmail,
          notificationTime,
          transitionId,
          amount,
          gateway,
          payment_status,
          currency
        };
        // console.log(' data => ', samplePaymentData);

        const emailTemplate = generatePaymentEmail(samplePaymentData);


        let mailoption = {
          from: EMAIL_SENDER,
          to: userEmail,
          subject: 'PaymentRemainderService',
          html: emailTemplate,

        };

        Sender.sendMail(mailoption, async (error, data) => {
          if (error) {
            console.error("Failed To Send Email to: ", mailoption.to);
          } else {
            console.log("Email Successfully Sent to : ", data.envelope.to);

            // update 
            await updateNotificationServicePayment(id, 'SUCCESS');
          }

        });

      });


    } catch (error) {
      console.log("Something Went wrong in while getting paymentTansaction", error);
      throw error;
    }
  });



  // ticket Confirm notification 


  cron.schedule("*/1 * * * * ", async () => {
    // every two minute
    try {
      console.log("sending ticket confirm at every 1 min ...... ")

      // 1. get unsent data from the paymentTransactoin
      const alldata = await getPendingMailServiceTicket();
      // console.log('all DAta => ',alldata);
      alldata.map(({ dataValues }) => {
        const {
          id,
          movie,
          email,
          showtime,
          cinemaLocation,
          Ticket,
          transactionId,
          payment_status,
          notificationTime,
          amount,
          currency,
          Image
        } = dataValues;

        const samplePaymentData = {

          email,
          Image,
          showtime,
          cinema: 'KTMCinemas',
          showname: 'Screen 1',
          cinemaLocation,
          movie,
          Ticket,
          notificationTime,
          transactionId,
          amount,
          currency,
          status: payment_status
        };

        const emailTemplate = generateTicketEmail(samplePaymentData);


          let mailoption = {
          from: EMAIL_SENDER,
          to: samplePaymentData.email,
          subject: 'Ticket Confirm Notification',
          html: emailTemplate,
        };

        Sender.sendMail(mailoption, async (error, data) => {
          if (error) {
            console.error("Failed To Send Email to: ", mailoption.to);
          } else {
            console.log("Email Successfully Sent to : ", data.envelope.to);
            // update 
            await updateNotificationServiceTicket(id, 'SUCCESS');
          }
        });

      })





    } catch (error) {
      console.log("Something Went wrong in while sending confirm ticket", error);
      throw error;
    }
  });




};

module.exports = setUptask;
