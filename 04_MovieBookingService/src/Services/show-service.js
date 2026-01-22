const Service = require('./CURD-Service');
const show_repo = require('../Repository/show-repo');
const cinema_repo = require('../Repository/cinema-repo')
const getRole = require('../Utlis/getRole');

class Show_Service extends Service {
    constructor() {
        super(show_repo)
    }

    async #verifyModerator(data) {
        try { // data -> email, role

            console.log('from cinema service verify moderator ', data);

            const result = await cinema_repo.verifyModerator(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in service  (uddate)');
            throw error;
        }
    }



    async create(data) {
        try {
            const detailToken = await getRole(data.token);
            console.log('role => ', detailToken.role);

            if (detailToken.role !== 'MODERATOR') {
                throw new Error('You are not MODERATOR')
            }

            const res = await this.#verifyModerator({ email: detailToken.email, cinemaId: data.cinemaId });
            console.log('show servie', res);

            const result = await show_repo.create(data);
            return result;
        } catch (error) {


            throw error;
        }
    }

    async getAllShowByDetails() {
        try {

            const result = await show_repo.getAllShowByDetails();
            return result;
        } catch (error) {
            console.log('Something went wrong in service (getAll)');
            throw error;
        }
    }


    async delete(data) {
        try {

            const role = await getRole(data.token);
            console.log('role from show service => ', role);
            if (role.role !== 'MODERATOR') {
                throw new Error('You are not MODERATOR')
            }

            const result = await this.curdRepo.delete(data.id);
            return result;
        } catch (error) {
            console.log('Something went wrong in service (delete)');
            throw error;
        }
    }

    async update(data) {
        try {
            const role = await getRole(data.token);
            // console.log('role => ', role);
            if (role.role !== 'MODERATOR') {
                throw new Error('You are not MODERATOR')
            }
            const result = await this.curdRepo.update(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in service  (uddate)');
            throw error;
        }
    }

    async updateSeats(data) {
        try {
            
            const result = await this.curdRepo.update(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in service  (updateSeats)');
            throw error;
        }
    }


    async getByCinemaId(id) {
        try {

            const data = await show_repo.getByCinemaId(id);
            return data;


        } catch (error) {
            console.log('Something went wrong in service (getByCinemaId)');
            throw error;
        }
    }

    async getByShowDetailById(id) {
        try {

            const data = await show_repo.getByShowDetailById(id);
            return data;


        } catch (error) {
            console.log('Something went wrong in service (getByShowDetailById)');
            throw error;
        }
    }

    async getByCinemaIdByArray(Ardata) {
        try {

            // 1. get all the cinema based on location 
            const details = await show_repo.getByCinemaArrayId(Ardata);
            return details;

        } catch (error) {
            console.log('Something went wrong in service (getByCinemaIdByArray)');
            throw error;
        }
    }
}


const showService = new Show_Service();

module.exports = showService;
