const { generateAccessToken } = require("../../middlewares/tokens/jwtTokenGenerators");

const refreshTokenController = async (req, res) => {
  const token = req.cookies?.refreshToken
  if (!token) {
    return res.send({ error: "Refresh token not found" });
  }

  try {
    const userExist = await User.findOne({ refreshToken: token });

    if (!userExist) {
      return res.send({ error: "Invalid token" });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.send({ error: "Invalid token" });
      }

      const accessToken = generateAccessToken(userExist);
      res.send(accessToken);
    });
  } catch (error) {
    console.log(error);
    res.send({ error: "Something went wrong" });
  }

}

module.exports = {refreshTokenController}
