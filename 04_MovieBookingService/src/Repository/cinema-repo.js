const Cinema = require('../Models/cinema');
const CurdRepo = require('./curd_repo');

class Cinema_repo extends CurdRepo {
    constructor() {
        super(Cinema);
    }

    async getAllCinemaByLocation(Location) {
        try {

            const result = await Cinema.find({ location: Location });
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');
            throw error;
        }
    }

    async verifyModerator(data) {
        try {

            const result = await Cinema.find({ _id: data.cinemaId });
            console.log(result);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');
            throw error;
        }
    }


}


const cinema_repo = new Cinema_repo();

module.exports = cinema_repo;