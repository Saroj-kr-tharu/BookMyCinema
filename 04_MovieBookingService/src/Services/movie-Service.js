const Service  = require('./CURD-Service');
const movie_repo = require('../Repository/movie-repo')
const getRole = require('../Utlis/getRole');

class Movie_Service extends Service {
        constructor(){
            super(movie_repo)
        }

        async create(data) {
            try {
                const res = await getRole(data.token);
                // console.log('role => ', role);
                if (res.role != 'MODERATOR') {
                    throw new Error('You are not MODERATOR')
                }
                const result = await movie_repo.create(data);
                return result;
            } catch (error) {
                
    
                throw error;
            }
        }
    
        async delete(data) {
            try {
                const role = await getRole(data.token);
                // console.log('role => ', role);
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
                const role = await getRole( data.token);
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
    

}


 const  movieService = new Movie_Service();

 module.exports = movieService;
