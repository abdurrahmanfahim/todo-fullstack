const {
  registrationController,
  loginController,
  emailVerificationController,
  refreshTokenController,
  resetPasswordController,
  forgotPasswordController,
} = require("../controllers/authController");
const registrationValidator = require("../middlewares/registrationValidator");

const router = require("express").Router();

router.post("/registration", registrationValidator, registrationController);

router.get("/verify/:token", emailVerificationController);

router.post("/login", loginController);

router.post("/refresh", refreshTokenController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

module.exports = router;
