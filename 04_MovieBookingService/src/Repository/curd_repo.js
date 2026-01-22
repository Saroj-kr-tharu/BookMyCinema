
class CurdRepo{ 
    
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');
            throw error;
        }
    }


    async update(data){
        try {
            const result = await this.model.findByIdAndUpdate(data.id, data.data, {new: true});
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');
            throw error;
        }
    }


    async delete(id){
        try {
            const result = await this.model.findByIdAndDelete(id);
            console.log(result);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');
            throw error;
        }
    }


    async getAll(){
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');
            throw error;
        }
    }


    async get(id){
        try {
            const result = await this.model.findById( id);
            // console.log(result);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (get)');
            throw error;
        }
    }


    
}


module.exports=  CurdRepo;