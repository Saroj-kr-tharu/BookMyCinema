const Service = require('./CURD-Service');
const booking_repo = require('../Repository/booking-repo');
const cinema_Service = require('./cinema-service');
const showService = require('./show-service');
const parseDateAndTime = require('../Utlis/dateConversion');
const genQR = require('../Utlis/qrGen');
const rabbitMqService = require('../Utlis/messageQueue');

const axios = require('axios');
const { PAYMENT_BACKEND_URL } = require('../Config/ServerConfig');


class Booking_Service extends Service {
    constructor() {
        super(booking_repo);
    }



    async bookingProcessService(data) {
        try {

            console.log('booking data recevied => ', data);

            // 1. Validate location
            const result = await cinema_Service.getDetailsBylocation(data.location);
            if (result.length <= 0) throw new Error('Location is not found');

            // 2. Filter cinema, movie, and screen
            const matchingCinema = result.flatMap(item => item).find(itm =>
                itm.cinemaId?.name === data.cinema &&
                itm.movieId?.title === data.movie &&
                itm.screenName === data.screens
            );


            console.log('matching cinema => ', matchingCinema);
            if (!matchingCinema) throw new Error('Cinema, movie, or screen not found in the specified location.');
            // 3. Validate show time
            const matchingShowTime = matchingCinema.showTime.find(date => {
                const { date_only, time_only } = parseDateAndTime(date);
                return date_only === data.Date && time_only === data.Time;
            });

            if (!matchingShowTime) throw new Error('Show time not available.');

            // 4. Validate seat availability and calculate total price

            let userSeatsDetails = [];
            let totalPrice = 0;

            matchingCinema.seats.map((item) => {
                if (data.seats.includes(item.seatNumber) && item.status == 'Available') {

                    userSeatsDetails.push({ 'seatNumber': item.seatNumber, 'Price': item.price })
                    totalPrice += item.price;
                }
            })
            if (userSeatsDetails.length == 0) throw new Error('Seat not AVAIABLE.');
            console.log(userSeatsDetails)

            // 6. insert into booking repo with userId, showId,seats,totalPrice,paymentStatus=pending,
            const totalSeats = [];
            userSeatsDetails.map(item => totalSeats.push(item.seatNumber));

            const res = await booking_repo.create({
                userId: data.userEmail,
                showId: matchingCinema._id,
                seats: totalSeats,
                totalPrice: totalPrice,
            });


            // 5. Generate summary
            const summary = {
                transactionId: res._id.toString(),
                Cinema_name: matchingCinema.cinemaId.name,
                Movie_Name: matchingCinema.movieId.title,
                Screen_Name: matchingCinema.screenName,
                Show_Time: `${data.Date} ${data.Time}`,
                Seats: userSeatsDetails,
                Total_Price: totalPrice,
                userEmail: data.userEmail
            };

            console.log('summary', summary);

            // 7 calling payment gateway 
            const response = await this.#paymentIntialize(data.gateway, summary);
            // console.log(response.data);
            return response;




        } catch (error) {
            console.log('Something went wrong in service (booking)', error);
            throw error;
        }
    }


    async #paymentIntialize(gateway, data) {
        try {


            let link;
            let reqBody;
            switch (gateway) {
                case 'esewa':
                    link = `${PAYMENT_BACKEND_URL}/initialize-esewa`;
                    reqBody = {
                        transactionId: data.transactionId,
                        totalPrice: parseInt(data.Total_Price, 10),
                        userEmail: data.userEmail
                    };
                    break;

                case 'khalti':
                    link = `${PAYMENT_BACKEND_URL}/epayment/initiate/`
                    reqBody = {
                        transactionId: data.transactionId,
                        return_url: "https://www.verify.com",
                        website_url: "https://www.frontend.com",
                        amount: parseInt(data.Total_Price, 10)* 100,
                        purchase_order_id: data.Movie_Name,
                        purchase_order_name: data.Movie_Name,
                        customer_info: {
                            seats: data.seats,
                            "userEmail": "sarojc11345@gmail.com"
                        }
                    };
                    break;

                case 'stripe':
                    link = `${PAYMENT_BACKEND_URL}/stripe-initiate/`
                    reqBody = {
                        transactionId: data.transactionId,
                        userEmail: data.userEmail,
                        amount: data.Total_Price,
                        items: data.Seats
                    }
                    break;
            }


            const axiosResult = await axios.post(link, reqBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            return axiosResult.data;

        } catch (error) {
            console.log('Something went wrong in service (PaymentIntialize)', error);
            throw error;
        }
    }

    async bookingComplete(bookingId) {
        try {
            // get booking id 
            // console.log('booking id => ', bookingId);

            // update seats to sold out , payment complete
            const bookingData = await booking_repo.update({
                id: bookingId,
                data: { paymentStatus: 'completed', }
            });
            // console.log('booking => ', bookingData);
            const showData = await showService.get(bookingData.showId.toString())
            // console.log('show data => ',showData.seats);

            const showDataDetails = await showService.getByShowDetailById(bookingData.showId.toString());
            // console.log('show detail => ', showDataDetails);

            const finalData = showData.seats.map(item => {
                // Clean up the seat object to only include necessary fields
                const cleanSeat = {
                    seatNumber: item.seatNumber,
                    status: bookingData.seats.includes(item.seatNumber) ? 'SoldOut' : item.status,
                    price: item.price,
                    _id: item._id
                };
                return cleanSeat;
            });


            const result = await showService.updateSeats({
                id: bookingData.showId.toString(),
                data: {
                    $set: {
                        seats: finalData
                    }
                }
            });


            // generate qr  which contain the booking id , seats , price 
            const qrData = {
                movie: showDataDetails.movieId.title,
                cinema: showDataDetails.cinemaId.name, 
                cinemaLocation: showDataDetails.cinemaId.location, 
                showid: bookingData.showId.toString(), 
                showname: showDataDetails.screenName,
                showtime: showDataDetails.showTime,
                email: bookingData.userId,
                bookingId: bookingId, 
                seats: bookingData.seats,
                totalPrice: bookingData.totalPrice,
                ticketConfirmed: true,
                timestamp: new Date().toISOString()
            };
            const qrCode = await genQR(qrData);

            // update to booking 
            await booking_repo.update({
                id: bookingId,
                data: { ticketQRCode: qrCode }
            });


            // send message to queue
            const payload = {
                bookingId,
                subject: "Movie Booking  System",
                email: bookingData.userId,
                Image: qrCode,
                Ticket: bookingData.seats,
                movie: showDataDetails.movieId.title,
                showtime: showDataDetails.showTime,
                cinema: showDataDetails.cinemaId.name, 
                cinemaLocation: showDataDetails.cinemaId.location, 
                showid: bookingData.showId.toString(), 
                showname: showDataDetails.screenName,
                notificationTime: new Date(),
                transactionId: bookingData._id.toString(),
                amount: bookingData.totalPrice,
                currency: 'npr',
                status: 'COMPLETE'
            };
            // console.log('payload => ', payload);

            await rabbitMqService.sendMessageToQueueService(payload);

            return payload;


        } catch (error) {
            console.log('Something went wrong in service (Booking Complete)', error);
            throw error;
        }
    }


}


const bookingService = new Booking_Service();

module.exports = bookingService;
