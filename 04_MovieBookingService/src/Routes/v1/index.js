const express = require("express");
const { movie, booking, cinema, show } = require('../../Controller/index');
const { bookingValidate, cinemaValidate, showValidate, movieValidate } = require('../../Middlewares/index');

const getRole = require('../../Utlis/getRole')

const router = express.Router();


router.get('/info', async (req, res) => {
    try {
     
        return res.status(200).json({
            message: 'Welcome MOvie Booking Service',
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

// movie 
router.post("/create", movieValidate.create, movie.create);
router.patch("/update", movieValidate.update, movie.update);
router.delete("/delete", movieValidate.delete, movie.delete);
router.get("/movie", movieValidate.delete, movie.get);
router.get("/movies", movie.getALL);

// booking
router.post("/createBooking", bookingValidate.create, booking.create);
router.patch("/updateBooking", bookingValidate.update, booking.update);
router.delete("/deleteBooking", bookingValidate.delete, booking.delete);
router.get("/findByIDFinalComplete", bookingValidate.delete, booking.get);
router.get("/bookings", booking.getALL);

// cinema
router.post("/createCinema", cinemaValidate.create, cinema.create);
router.patch("/updateCinema", cinemaValidate.update, cinema.update);
router.delete("/deleteCinema", cinemaValidate.delete, cinema.delete);
router.get("/cinema", cinemaValidate.delete, cinema.get);
router.get("/cinemas", cinema.getALL);


// show
router.post("/createshow", showValidate.create, show.create);
router.patch("/updateshow", showValidate.update, show.update);
router.delete("/deleteshow", showValidate.delete, show.delete);
router.get("/show", showValidate.delete, show.get);
router.get("/shows", show.getALL);


// Booking process 
router.get("/location", cinemaValidate.location, cinema.getAllDetails);
router.post("/FinalIntial", booking.bookingProcess);
router.get("/FinalComplete", booking.bookingComplete);



module.exports = router;
