

const jwt = require('jsonwebtoken');
const { PRIVATEJWT } = require("../config/serverConfig");

class JWT {
  async createToken(data, time= '20m') {
    try {
      const token = await jwt.sign({ data }, PRIVATEJWT, {
        expiresIn: time, // 1 min or 60 sec
      });

      return token;
    } catch (error) {
      console.log("Something went wrong in service layer (creating the token)");
      throw error;
    }
  }

  async verifyToken(token) {
    try {
      const response = jwt.verify(token, PRIVATEJWT);
      if (!response) throw { error: "Invalid Token  " };


      return response;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log("Token has expired");
        throw { error: "TokenExpiredError", message: "Token has expired" };
      } else {
        console.log("Something went wrong in service layer (verify token)");
        throw error;
      }
    }
  }
}

const jwt_helper = new JWT();

module.exports = { jwt_helper };
