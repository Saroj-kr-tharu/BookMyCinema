
const mongoose = require('mongoose');
const {DB_NAME,DB_URL} = require("./ServerConfig")

// const url =  `${DB_URL}/${DB_NAME}`;
const baseUrl = DB_URL.split('?')[0];
const url = `${baseUrl}/${DB_NAME}?authSource=admin`;

const connect = async () => {
    await mongoose.connect(url);

}

module.exports =  connect;