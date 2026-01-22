const Service = require('./CURD-Service');
const paymentTransactionRepo = require('../Repository/paymentTranstion_repo');

class PaymentTransactionService extends Service {
  constructor() {
    super(paymentTransactionRepo);
  }

  async updateByTransId(transId, data) {
    try {

      const res = await paymentTransactionRepo.updateByTrans(transId, data);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (updateByTransId)");
      throw error;
    }
  }
  
  async getDetailsByTransid(transId) {
    try {

      const res = await paymentTransactionRepo.getDetailsByTransid(transId);
      return res;
    } catch (error) {
      console.log("Something went wrong in service layer (getDetailsByTransid)");
      throw error;
    }
  }
 




}

const paymentTransactionService = new PaymentTransactionService();
module.exports = paymentTransactionService;