const { loginController } = require("./loginController");
const { registerController } = require("./registerController");
const { refreshTokenController } = require("./refreshTokenController");
const { forgotPasswordController } = require("./forgotPasswordController");
const { resetPasswordController } = require("./resetPasswordController");
const { verifyEmailController } = require("./verifyEmailController");

module.exports = {
  loginController,
  registerController,
  refreshTokenController,
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController,
};
