const Service = require('./CURD-Service');
const showService = require('./show-service');
const cinema_repo = require('../Repository/cinema-repo')
const getRole = require('../Utlis/getRole');


class Cinema_Service extends Service {
    constructor() {
        super(cinema_repo)
    }

    async getDetailsBylocation(data) {
        try {

            // 1. get all the cinema based on location 
            const cinemasList = await cinema_repo.getAllCinemaByLocation(data);
            let result =  await Promise.all(
                cinemasList.map(async (item) => {
                    return !item._id || await showService.getByCinemaId(item._id.toString());
                })
            );
            // console.log('result from cinema service => ', result); // Updated to log the result obtained from showService
            return result;

        } catch (error) {
            console.log('Something went wrong in repo (create)');
            throw error;
        }
    }

    async verifyModerator(data) {
        try { // data -> email, role
            if (role !== 'MODERATOR') {
                throw new Error('You are not MODERATOR')
            }
            console.log('from cinema service verify moderator ',data);

            const result = await cinema_repo.verifyModerator(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in service  (uddate)');
            throw error;
        }
    }

     

    
    async create(data) {
        try {
            const role = await getRole(data.token);
            // console.log('role => ', role);
            if (role.role !== 'ADMIN') {
                throw new Error('You are not Admin')
            }
            const result = await cinema_repo.create(data);
            return result;
        } catch (error) {
            

            throw error;
        }
    }

    async delete(data) {
        try {
            // console.log("data ", data);
            const role = await getRole(data.token);
            // console.log('role => ', role);
            if (role.role !== 'ADMIN') {
                throw new Error('You are not Admin')
            }
            const result = await cinema_repo.delete(data.id);
            return result;
        } catch (error) {
            console.log('Something went wrong in service (delete)');
            throw error;
        }
    }

    async update(data) {
        try {
            const role = await getRole( data.token);
            // console.log('role => ', role);
            if (role.role !== 'ADMIN') {
                throw new Error('You are not Admin')
            }
            const result = await this.curdRepo.update(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in service  (uddate)');
            throw error;
        }
    }

   


}


const cinema_Service = new Cinema_Service();

module.exports = cinema_Service;
