const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.send({ error: "You are not Authorized" });
  }

  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decoded) => {
    if (error) {
      return res.send({ error: "You are not authorized" });
    }

    req.user = decoded;

    next();
  });
};

module.exports = { authMiddleware };
