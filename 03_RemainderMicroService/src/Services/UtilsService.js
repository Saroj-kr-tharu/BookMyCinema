const { MOVIE_BOOKING_URL, AUTH_SERVICE_URL } = require('../config/ServerConfig');
const axios = require('axios');

const top10Movie = async () => {
  try {
    const result = await axios.get(`${MOVIE_BOOKING_URL}/movies`);
    const res = result.data.data;

    const now = new Date();
    const upcomingWeek = new Date();
    upcomingWeek.setDate(now.getDate() - 7);

    const finalResult = res.filter((item) => {
      const createdAtDate = new Date(item.createdAt);
      return createdAtDate >= upcomingWeek && createdAtDate <= now;
    });
    return finalResult;

  } catch (error) {
    console.log("Something went wrong in getting Top 10 Movie  (Top10MovieService)");
    throw error;
  }
};


const getUserAllCustumer = async () => {
  try {
    let users = await axios.get(`${AUTH_SERVICE_URL}getAllUserByRole`, {
      params: { role: 'CUSTUMER' }
    });

    users = users.data.data;
    return users;

  } catch (error) {
    console.log("Something went wrong in getting all User Custumer  (getUserAllCustumer)");
    throw error;
  }
};


module.exports = {
  top10Movie,
  getUserAllCustumer
};
