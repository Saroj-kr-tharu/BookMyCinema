const showService = require('../Services/show-service');
const { ServerErrosCodes, SucessCode } = require('../Utlis/ServerCodes');

class showController {

    async create(req, res) {
        try {
            const { movieId, cinemaId, screenName, showTime, seats } = req.body;
            const token = req?.headers['x-access-token'];
            const data = {
                movieId, cinemaId, screenName, showTime, seats,token
            }
            console.log(data);
            const result = await showService.create(data);
            
            return res.status(SucessCode.CREATED).json({
                message: "Successfully to Create a show ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to Create a show",
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

            const result = await showService.update(data);

            return res.status(SucessCode.OK).json({
                message: "Successfully to Update a show ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (update)');
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
            const data = {id,token}
            const result = await showService.delete(data);

            return res.status(SucessCode.OK).json({
                message: "Successfully to delete a show ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete a show",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async get(req, res) {
        try {

            const id = req?.query?.id;
            const result = await showService.get(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to get a show ",
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

            const result = await showService.getAllShowByDetails();

            return res.status(SucessCode.OK).json({
                message: "Successfully to get all show ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (getall)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get all Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

}


const show = new showController();

module.exports = show;