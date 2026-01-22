const Show = require('../Models/show');
const CurdRepo = require('./curd_repo');

class Show_repo extends CurdRepo {
    constructor() {
        super(Show);
    }

    async getAllShowByDetails(id) {
        try {

            const populatedData = await Show.find()
                .populate({ path: 'movieId' })
                .populate(
                    {
                        path: 'cinemaId',
                        populate: {
                            path: 'screens'
                        }
                    }).exec();
            return (populatedData);

        } catch (error) {
            console.log('Something went wrong in repo (getByCinemaId)');
            throw error;
        }
    }

    async getByCinemaId(id) {
        try {

            const populatedData = await Show.find({ cinemaId: id })
                .populate({ path: 'movieId' })
                .populate(
                    {
                        path: 'cinemaId',
                        populate: {
                            path: 'screens'
                        }
                    }).exec();
            return (populatedData);

        } catch (error) {
            console.log('Something went wrong in repo (getByCinemaId)');
            throw error;
        }
    }

     async getByShowDetailById(id) {
        try {

             const populatedData = await Show.findById({ _id: id })
                .populate({ path: 'movieId' })
                .populate(
                    {
                        path: 'cinemaId',
                        populate: {
                            path: 'screens'
                        }
                    }).exec();
            return (populatedData);

        } catch (error) {
            console.log('Something went wrong in repo (getByShowDetailById)');
            throw error;
        }
    }

    async getByCinemaArrayId(Arrayid) {
        try {


            const populateData = async (dataArray) => {
                return Promise.all(
                    dataArray.map(async (item) => {
                        return await Show.populate(item, [
                            { path: 'movieId' },
                            { path: 'cinemaId' },
                        ]);
                    })
                );
            };
            return (populateData);

        } catch (error) {
            console.log('Something went wrong in repo (getByCinemaId)');
            throw error;
        }
    }

     
}


const show_repo = new Show_repo();

module.exports = show_repo;