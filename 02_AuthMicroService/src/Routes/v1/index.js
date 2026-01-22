const express = require("express");
const { PassportCon } = require("../../utlis/Passport");
const { FORTEND_REDIRECT_URL } = require("../../config/serverConfig")

const {
  deleteValidation,
  signupandSinginandValidation,
  roleValidation,
  checkroleByTokenValidation,
  tokenVerifyValidation,
  changePassValidation,
  resetPassValidation,
  sendResetValidation,
  verifyResetValidation,
  checkroleValidation,
  roleByValidation,
  verifyTokenMiddleware,
  verifyTokenBodyMiddleware
} = require("../../Middlewares/authMiddleare");

const {
  oAuthController,

  resetController,
  authController,
} = require("../../Controllers/index");

const router = express.Router();

router.get("/ping", (req, res) => {
  return res.json({ message: "Auth Server is good to GO" });
});

router.get(
  "/auth/google",
  PassportCon.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  PassportCon.authenticate("google", {
    failureRedirect: `${FORTEND_REDIRECT_URL}/failed`,
  }),

  async (req, res) => {
    const user = await req.user;
    await req.logout(() => {
      console.log("Logout success");
    });

    res.redirect(`${FORTEND_REDIRECT_URL}/success?token=` + user);
  }
);

router.get("/failed", oAuthController.FailedController);
router.get("/success", oAuthController.SucessController);


router.post(
  "/verifyBodyToken",
  verifyTokenBodyMiddleware,
  oAuthController.VerifyTokenOauthController
);

// signup 
router.post(
  "/signup",
  signupandSinginandValidation,
  authController.signupContro
);
// Sign in 
router.post(
  "/signin",
  signupandSinginandValidation,
  authController.signinContro
);

router.post(
  "/authenticate",
  tokenVerifyValidation,
  authController.isAuthenticatedContrr
);

// token 
router.get('/checkToken', authController.checkToken);;

// Role 
router.post("/addRole", roleValidation, authController.addRoleContro);
router.get("/checkRole", checkroleValidation, authController.checkRoleContro);
router.get("/checkRoleByToken", checkroleByTokenValidation, authController.checkRoleContro);
router.get("/getAllUser", roleValidation, authController.getAllUserByRoleContro);
router.get("/getAllUserByRole", roleByValidation, authController.AllUserByRoleContro);


// change password
router.post(
  "/changepassword",
  verifyTokenMiddleware,
  changePassValidation,
  authController.changePassContro
);


// delete user from the system 
router.delete("/delete", deleteValidation, authController.deleteContro);


// ForgetPassword Send Link 1 
router.post(  // send reset link 
  "/sendResetLink",
  sendResetValidation,
  resetController.sendResetLinkContro
);


// Verify the Forget password link
router.post(  // reset the password or change the password
  "/resetPassword",
  resetPassValidation,
  resetController.ResetPasswordContro
);


router.get(  // verify the reset link is valid or not 2
  "/reset-password",
  verifyResetValidation,
  resetController.verifyResetLinkContro
);

module.exports = router;
