const Movie = require('../Models/movie');
const CurdRepo = require('./curd_repo');

class Movie_repo extends CurdRepo {
    constructor() {
        super(Movie);
    }
}


const movie_repo = new Movie_repo();

module.exports = movie_repo;