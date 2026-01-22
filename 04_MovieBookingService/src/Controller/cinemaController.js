const cinema_Service = require('../Services/cinema-service');
const {  ServerErrosCodes, SucessCode } = require('../Utlis/ServerCodes');

class cinemaController {

    async create(req, res) {
        try {
            const { name, location, managerId, screens} = req.body;
            const token  = req?.header("x-access-token");
            const data = {
                name, location, managerId, screens,token
            }
            
            // console.log(data);
            const result = await cinema_Service.create(data);
          
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
                token:req?.header("x-access-token")
            }

            const result = await cinema_Service.update(data);

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
             const token  = req?.header("x-access-token");

            const result = await cinema_Service.delete({id, token});

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
            console.log('id => ', id);
            const result = await cinema_Service.get(id);

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
            const result = await cinema_Service.getAll();

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

    async getAllDetails(req, res) {
        try {

            const id = req?.query?.location;
            const result = await cinema_Service.getDetailsBylocation(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to get a Booking ",
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

}


const cinema = new cinemaController();

module.exports = cinema;