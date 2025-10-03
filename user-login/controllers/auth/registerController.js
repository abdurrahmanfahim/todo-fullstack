const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const { mailUserForVerify } = require("../../utils/mails/verificationMailer");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/tokens/jwtTokenGenerators");

// registerController

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hash,
    });

    await user.save();
    mailUserForVerify(user)
    res
      .status(200)
      .send({
        message: "user created, Please check your email for verification!",
      });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong!" });
    console.log(error);
  }
};

module.exports = { registerController };
