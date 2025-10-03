const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const User = require("../../models/userModel");

const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const userExist = await User.findById(decoded.id);

    const hash = await bcrypt.hash(password, 12)
    userExist.password = hash;

    await userExist.save();
    
    res.send({message: 'Your Password Changed Successfully!'});
  } catch (error) {
    console.log(error, "invalid token");
    return res.status(400).json({ error: "Invalid or expired token" });
  }
};

module.exports = { resetPasswordController };
