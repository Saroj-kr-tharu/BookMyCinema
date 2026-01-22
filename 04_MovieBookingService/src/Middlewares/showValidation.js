const { ClientErrorsCodes, ServerErrosCodes } = require('../Utlis/ServerCodes');

class showValidataion {

    create(req, res, next) {
        const { movieId, cinemaId, screenName, showTime, seats } = req.body;
        const token = req?.headers['x-access-token'];

        if ( !token|| !movieId || !cinemaId ||  !screenName || !showTime || !seats) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for create show',
                err: 'Missing mandatory properties to create for a show'
            });
        }
        next();
    }

    update(req, res, next) {
        const data = req.body;
        const id =  req?.query?.id;
        const token = req?.headers['x-access-token'];

        if (!data || !id || !token) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for update show',
                err: 'Missing mandatory properties to create for a show'
            });
        }
        next();
    }

    delete(req, res, next) {
        const id =  req?.query?.id;
        const token = req?.headers['x-access-token'];

        if (!id || !token) {
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
                data: {},
                sucess: false,
                message: 'Invalid request  for delete show',
                err: 'Missing mandatory properties to delete for a show'
            });
        }
        next();
    }



}


const showValidate = new showValidataion();

module.exports = showValidate;