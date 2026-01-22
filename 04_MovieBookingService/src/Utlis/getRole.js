const { default: axios } = require("axios");
const { AUTH_BACKEND_URL } = require('../Config/ServerConfig');


async function getRole(token) {
    try {
        console.log('getting role calleed ')
        const response = await axios.get(`${AUTH_BACKEND_URL}checkRoleByToken`, {
            headers: {
                'x-access-token': token
            },
           
        });
        console.log('Role check response:', response.data);
        const role = response.data.data;
        return role;
    } catch (error) {
        console.log('Something went wrong in get role utils (getrole)', error.data);
        throw error;
    }
}

module.exports = getRole;