
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Routes = require('./Route/index');
const {PORT} = require('./config/serverConfig');


const serverSetupAndStart = () => {
    const app = express();

    // middlewares
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.use('/api', Routes);

    app.listen(PORT, () => {
        console.log(`Server is Running at port http://localhost/${PORT}`);
        // curd.write(newData);

        // curd.updateCom(4, {complete: true});
    })
}


serverSetupAndStart();