const { ClientErrorsCodes, ServerErrosCodes } = require('../Utlis/ServerCodes');

class movieValidataion {

    create(req, res, next) {
        const { name, location, managerId, screens } = req.body;
        const token  = req?.header("x-access-token");

        if (!name || !location || !managerId || !screens || !token  ) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for create Cinema',
                err: 'Missing mandatory properties to create for a Cinema'
            });
        }
        next();
    }

    update(req, res, next) {
        const data = req.body;
        const id =  req?.query?.id;
        const token  = req?.header("x-access-token");

        if (!data || !id || !token ) {
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
        const id =  req?.query?.id;
        if (!id) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for delete movie',
                err: 'Missing mandatory properties to delete for a movie'
            });
        }
        next();
    }

    location(req, res, next) {
        const id =  req?.query?.location;
        if (!id) {
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