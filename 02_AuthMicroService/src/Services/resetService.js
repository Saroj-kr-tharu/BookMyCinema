const { restLinkRepo } = require("../Repository/resetLinkRepo");
const curdService = require("./curdService");

const { jwt_helper } = require("../utlis/jwtHelps");
const authService = require("./authService");
const bcryptHelper = require("../utlis/bcrypt_helper");

const { BASEURL_AUTH } = require("../config/serverConfig")

class ResetService extends curdService {
  constructor() {
    super(restLinkRepo);
  }
  async sendResetLink(email) {
    try {

      // 1. find the user by email
      const user = await authService.getUserByEmailService(email);
      if (!user) return "User is not present with this Email";

      // console.log(user);

      const userId = user.id;

      // 2. generate token (email)
      const token = await jwt_helper.createToken({ email, userId }, '5m');

      // 3. genrate the link
      const link = `${BASEURL_AUTH}/reset-Password`;
      console.log(link);

      // 4. update the db
      const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
      const data = {
        token: token,
        userId,
        expiresAt,
      };
      // console.log(data);

      await this.createService(data);

      // 5. push the message to queue
      const Username = email.split('@')[0];
      const payload = {
        subject: "Forget Password Mail",
        content: "Reset",
        recepientEmail: email,
        notificationTime: new Date(),
        typeMail: "FORGET",
        username: Username,
        token: token
      };
      await authService.sendMessageToQueueService(payload);
      // 6. return the link
      return link;
    } catch (error) {
      console.log("something is wrong in service layer (restService) ");
      throw error;
    }
  }

  async verifyResetLink(token) {
    try {
      // 1. get token
      // 2. verify token
      // console.log('token => ', token);

      const result = await jwt_helper.verifyToken(token);
      if (!result) return "Invalid Link";
      

      

      // 4. return true  if form for rest passport
      return token;
    } catch (error) {
      console.log("something is wrong in service layer (restService) ");
      throw error;
    }
  }

  async ResetPasswordLink(token, password) {
    try {
      // 1. verify the token
      const result = await jwt_helper.verifyToken(token);

      // 2. get the userEmail, userId
      const userId = result.data.userId;

      // console.log(password);

      // 3. hash the password
      const hash = await bcryptHelper.generatePasswordService(password);
      // console.log(hash);

      // 4. delete the reset token from resttoken db
      await restLinkRepo.deleteAllResetTokensByUserId(userId);

      // 5. update the password
      let data = {
        password: hash
      }
      let res = await authService.updateService(userId, data);

      // 6. return the true
      return res;


    } catch (error) {
      console.log("something is wrong in service layer (restService) ");
      throw error;
    }
  }
}

const resetService = new ResetService();
module.exports = resetService;
