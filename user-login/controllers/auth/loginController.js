const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../middlewares/tokens/jwtTokenGenerators");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Add your login logic here
  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    return res.status(401).send({ error: "Invalid Credential!" });
  }

  if (!userExist.isVerified) {
    return res.status(401).send({error: 'Please Verify Your Email First!'})
  }

  const isPasswordMatched = await bcrypt.compare(password, userExist.password);

  if (!isPasswordMatched) {
    return res.status(401).send({ error: "Invalid Credential!" });
  }

  const accessToken = generateAccessToken(userExist);
  const refreshToken = generateRefreshToken(userExist);

  try {
    userExist.refreshToken = refreshToken;

    await userExist.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60 * 1000, // one year validation
    });

    res.send({
      massage: "Login Successful",
      accessToken: accessToken,
      username: userExist.username,
      email: userExist.email,
    });
  } catch (error) {
    console.log(error);
    return res.send({ error: "Something went Wrong!" });
  }
};

module.exports = { loginController };
