  const User = require("../../models/userModel");
const { mailUserForPasswordChange } = require("../../utils/mails/verificationMailer");

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    return res.status(201).send({error: 'user not found!'})
  }

  try {
    mailUserForPasswordChange(userExist);
    res.status(200).send({message: 'Please check your email for changing your password!'})
  } catch (error) {
    console.log(error);
    res.status(500).send({error: 'Something went wrong!'})
  }
};


module.exports = { forgotPasswordController };
