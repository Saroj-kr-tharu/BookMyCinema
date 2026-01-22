const cinema_Service = require('../Services/cinema-service');

async function verifyModeratorUtils(data) {
    try {
       
       const result = await cinema_Service.verifyModerator(data);
       return result;
           
        
      
    } catch (error) {
        console.log('Something went wrong in verify Moderator utils (verifyModerator)', error);
        throw error;
    }
} 

module.exports = verifyModeratorUtils;