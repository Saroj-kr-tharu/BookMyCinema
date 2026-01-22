const Booking = require('../Models/booking');
const CurdRepo = require('./curd_repo');

class Booking_repo extends CurdRepo {
    constructor() {
        super(Booking);
    }

    
}


const booking_repo = new Booking_repo();

module.exports = booking_repo;