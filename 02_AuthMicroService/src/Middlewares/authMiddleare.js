const { jwt_helper } = require("../utlis/jwtHelps")

const deleteSessionValidation = (req, res, next) => {
  if (!req.session) {
    console.log("Something went wrong in Oauth middleware");
    return res.status(400).json({
      data: {},
      err: "Session is missing",
      message: "Session  is missing  ",
      success: false,
    });
  }
  console.log(req.session);

  // next();
};

const signupandSinginandValidation = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    console.log("Something went wrong in auth middleware");
    return res.status(400).json({
      data: {},
      // err: error || error.message,
      message: "Email or Password is missing  ",
      success: false,
    });
  }

  next();
};

const deleteValidation = (req, res, next) => {
  if (!req.body.email) {
    console.log("Something went wrong in auth middleware");
    return res.status(400).json({
      data: {},
      err: "Email is missing",
      message: "Email  is missing  ",
      success: false,
    });
  }

  next();
};

const roleValidation = (req, res, next) => {
    const {email,role} = req?.body;
    const token = req?.headers['x-access-token'];


    console.log(email,role,token);

  if (!email || !role || !token) {
    return res.status(400).json({
      data: {},
      err: "Parameter is missing",
      message: "Parameter  is missing  ",
      success: false,
    });
  }

  next();
};

const roleByValidation = (req, res, next) => {
  const role = req?.query?.role;

  // console.log('role => ', role);

if (!role ) {
  return res.status(400).json({
    data: {},
    err: "Parameter is missing",
    message: "Parameter  is missing  ",
    success: false,
  });
}

next();
};

const hasRoleValidation = (req, res, next) => {
  if (!req.body.email) {
    console.log("Something went wrong in hasRole");
    return res.status(400).json({
      data: {},
      err: "Email  is missing",
      message: "Email   is missing  ",
      success: false,
    });
  }

  next();
};

const tokenVerifyValidation = (req, res, next) => {
  // const token = req.header("x-access-token");
  // console.log(req.header("x-access-token"));
  
  if (!req.header("x-access-token")) {
    console.log("Something went wrong in VerifyToken");
    return res.status(400).json({
      data: {},
      err: "Token is missing",
      message: "Token   is missing  ",
      success: false,
    });
  }
  next();
};

const verifyTokenMiddleware = async(req, res, next) => {
  try {
    const token = req.header("x-access-token");
    // console.log('token => ', token);

    if (!token) {
      console.log("Something went wrong in reset token validation");
      return res.status(400).json({
        data: {},
        err: "Token Required token is missing",
        message: "Token Required token is missing",
        success: false,
      });
    }

    const response = await jwt_helper.verifyToken(token);

    if (!response) {
      return res.status(400).json({
        data: {},
        err: "Invalid token",
        message: "Invalid token",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log("Error in verifyTokenMiddleware:", error);
    return res.status(500).json({
      data: {},
      err: error.message,
      message: "Internal server error",
      success: false,
    });
  }
};

const verifyTokenBodyMiddleware = async(req, res, next) => {
  try {
    const token = req?.body?.token;
    console.log('token => ', token);

    if (!token) {
      console.log("Something went wrong in reset token validation");
      return res.status(400).json({
        data: {},
        err: "Required token is missing",
        message: "Required token is missing",
        success: false,
      });
    }

    const response = await jwt_helper.verifyToken(token);

    if (!response) {
      return res.status(400).json({
        data: {},
        err: "Invalid token",
        message: "Invalid token",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log("Error in verifyTokenMiddleware:", error);
    return res.status(500).json({
      data: {},
      err: error.message,
      message: "Internal server error",
      success: false,
    });
  }
};

const checkroleValidation = (req, res, next) => {
  const {email} = req?.query;
  const token = req?.headers['x-access-token'];


  console.log(email,token);

if (!email ||  !token) {
  return res.status(400).json({
    data: {},
    err: "Parameter is missing",
    message: "Parameter  is missing  ",
    success: false,
  });
}

next();
};

const checkroleByTokenValidation = (req, res, next) => {
  const token = req?.headers['x-access-token'];



if (  !token) {
  return res.status(400).json({
    data: {},
    err: "Parameter is missing",
    message: "Parameter  is missing  ",
    success: false,
  });
}

next();
};

const changePassValidation = (req, res, next) => {
  const { email, newPassword, oldPassword } = req.body;
  console.log("from middleware ", {email, newPassword, oldPassword});
  if (!email || !newPassword || !oldPassword) {
    console.log("Something went wrong in change Pass validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};

const resetPassValidation = (req, res, next) => {
  const token = req?.headers['x-access-token'];
  console.log('data => ',token, req.body.password)
  if (!token || !req.body.password) {
    console.log("Something went wrong in reset Pass validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};

const sendResetValidation = (req, res, next) => {
  if (!req.body.email) {
    console.log("Something went wrong in reset sendResetLink validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};



const verifyResetValidation = (req, res, next) => {
  
  if (!req.query.token) {
    console.log('middle', req.query.token)
    console.log("Something went wrong in reset verifyResetLink validation ");
    return res.status(400).json({
      data: {},
      err: "Required parameter is missing",
      message: "Required parameter  is missing  ",
      success: false,
    });
  }
  next();
};



module.exports = {
  signupandSinginandValidation,
  deleteValidation,
  roleValidation,
  hasRoleValidation,
  deleteSessionValidation,
  tokenVerifyValidation,
  changePassValidation,
  resetPassValidation,
  sendResetValidation,
  verifyResetValidation,
  verifyTokenMiddleware,
  verifyTokenBodyMiddleware,
  checkroleValidation,
  checkroleByTokenValidation,
  roleByValidation
};
