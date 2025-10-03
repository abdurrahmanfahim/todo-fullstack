const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const verifyEmailController = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const userExist = await User.findById(decoded.id);
    if (!userExist) {
      return res.send({ error: "invalid token" });
    }
    userExist.isVerified = true;

    await userExist.save();
    res.status(200).send({ message: "email verified successfully!" });
  } catch (error) {
    res.status(500).send({ error: "Invalid token or Expired!" });
  }
};

module.exports = { verifyEmailController };
