const express = require("express");
const bodyParser = require("body-parser");

const { PORT, REMINDER_BINDING_KEY, } = require("./config/ServerConfig");
const appRoute = require("./Routes/index");
const setUptask = require("./utlis/jobsSchedule");


const {
  welcomeEmail,
  verifyEmail,
  forgetEmail,
} = require("./utlis/Template");

const { createChannel, subscribeMessage } = require("./utlis/messageQueue");
const { subscribeEvent } = require("./Services/remainderService");



const serverSetupAndStartUp = async () => {

  const app = express();
  // middlewares
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/api", appRoute);

  const channel = await createChannel();
  subscribeMessage(channel, subscribeEvent, REMINDER_BINDING_KEY);

  app.listen(PORT, () => {
    console.log("Server is started at ", PORT);
    setUptask();


  }); 
};

serverSetupAndStartUp();
