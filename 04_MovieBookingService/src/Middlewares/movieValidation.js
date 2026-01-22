const { ClientErrorsCodes, ServerErrosCodes } = require('../Utlis/ServerCodes');

class movieValidataion {

    create(req, res, next) {
        const { title, description, duration, cast, director, genre, releaseDate, slideImage,image } = req.body;
        const token = req?.headers['x-access-token'];
        if (!token || !slideImage || !title || !description || !duration || !cast || !director || !genre || !releaseDate || !image) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for create movie',
                err: 'Missing mandatory properties to create for a movie'
            });
        }
        next();
    }

    update(req, res, next) {
        const data = req.body;
        const id = req?.query?.id;
        const token = req?.headers['x-access-token'];

        if (!token || !data || !id) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for update movie',
                err: 'Missing mandatory properties to create for a movie'
            });
        }
        next();
    }

    delete(req, res, next) {
        const id = req?.query?.id;
        const token = req?.headers['x-access-token'];
        if (!token || !id) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for delete movie',
                err: 'Missing mandatory properties to delete for a movie'
            });
        }
        next();
    }



}


const movieValidate = new movieValidataion();

module.exports = movieValidate;