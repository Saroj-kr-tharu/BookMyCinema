const express = require("express");
const appRoutes = require("./Routes/index");
const bodyParser = require("body-parser");
const { PORT } = require("./Config/ServerConfig");
const connect = require('./Config/databaseConfig');

const serverSetupAndStart = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  app.use("/api", appRoutes);

  app.listen(PORT, async () => {
    console.log(`Server Started at ${PORT}`);
    await connect();

  });
};

serverSetupAndStart();
