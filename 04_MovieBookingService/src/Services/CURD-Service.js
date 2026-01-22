
class Service {

    constructor(repo) {
        this.curdRepo = repo;
    }

    async create(data) {
        try {
            const result = await this.curdRepo.create(data);
            return result;
        } catch (error) {
            

            throw error;
        }
    }

    async delete(id) {
        try {
            
            const result = await this.curdRepo.delete(id);
            return result;
        } catch (error) {
            console.log('Something went wrong in service (delete)');
            throw error;
        }
    }

    async update(data) {
        try {
           
            const result = await this.curdRepo.update(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in service  (uddate)');
            throw error;
        }
    }


    async getAll() {
        try {

            const result = await this.curdRepo.getAll();
            return result;
        } catch (error) {
            console.log('Something went wrong in service (getAll)');
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.curdRepo.get(id);
            return result;
        } catch (error) {
            console.log('Something went wrong in service (get by id )');
            throw error;
        }
    }

}

module.exports = Service;