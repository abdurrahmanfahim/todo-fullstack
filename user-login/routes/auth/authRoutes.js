const {
  loginController,
  registerController,
  refreshTokenController,
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController,
} = require("../../controllers/auth/allAuthControllers");

const {
  usernameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
} = require("../../middlewares/validation/registrationValidator");

const router = require("express").Router();

router.post(
  "/sign-up",
  [
    usernameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
  ],
  registerController
);

router.get("/verify-email/:token", verifyEmailController);

router.post(
  "/sign-in",
  [
    usernameValidator,
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
  ],
  loginController
);

router.post("/refresh", refreshTokenController);

router.post("/forgot-password", [emailValidator], forgotPasswordController);

router.post(
  "/reset-password/:token",
  [passwordValidator],
  resetPasswordController
);

module.exports = router;
