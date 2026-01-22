const movieService = require('../Services/movie-Service');
const {  ServerErrosCodes, SucessCode } = require('../Utlis/ServerCodes');

class MovieController {

    async create(req, res) {
        try {
            const { title, slideImage, description, duration, cast, director, genre, releaseDate, image } = req.body;
            const token = req?.headers['x-access-token'];
            const data = {
                token,title, description, duration, cast, director, genre, releaseDate, image,slideImage
            }
            // console.log(data);
            const result = await movieService.create(data);

            return res.status(SucessCode.CREATED).json({
                message: "Successfully to Create a Moive ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to Create a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }


    async update(req, res) {
        try {

            const data = {
                id: req?.query?.id,
                data: req.body,
                token : req?.headers['x-access-token']
            }

            const result = await movieService.update(data);

            return res.status(SucessCode.OK).json({
                message: "Successfully to Update a Moive ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async delete(req, res) {
        try {

            const id = req?.query?.id;
            const token = req?.headers['x-access-token'];
            const data = {id,token};
            const result = await movieService.delete(data);

            return res.status(SucessCode.OK).json({
                message: "Successfully to delete a Moive ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async get(req, res) {
        try {

            const id = req?.query?.id;
            const result = await movieService.get(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to get a Moive ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async getALL(req, res) {
        try {

            const result = await movieService.getAll();

            return res.status(SucessCode.OK).json({
                message: "Successfully to get all Moive ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get all Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

}


const movieCont = new MovieController();

module.exports = movieCont;