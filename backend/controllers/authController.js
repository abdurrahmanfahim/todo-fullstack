const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "365d",
  });
};


// new ========= registration controller =========
const registrationController = async (req, res) => {
  const { username, email, password } = req.body;

  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
    return res.send({ error: `${emailExist.email} already exist` });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashed,
    isVerified: false,
  });

  try {
    await user.save();

    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "1d" }
    );
    const verifyLink = `${process.env.SERVER_URL}/api/auth/verify/${verificationToken}`;

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: `Dear ${user.username}, Please Verify Your Email.`,
      html: `<h3>Please Verify Your Email</h3> <br> <a href="${verifyLink}">Click to Verify</a> `,
    });

    res.send({ massage: "registration successful, please check your email" });
  } catch (error) {
    res.send({ error: error });
  }
};

// new ========= email verification controller =========
const emailVerificationController = async (req, res) => {
  const {token} = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const userExist = await User.findById(decoded.id);
    if (!userExist) {
      return res.send({ error: "invalid token" });
    }
    userExist.isVerified = true;

    await userExist.save();

    res.send({ massage: "Email Verified Successful" });
  } catch (error) {
    res.send({ error: "invalid token or expired" });
    console.log(error);
  }
};


// new ========= login controller ========= 
const loginController = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email: email });

  if (!userExist) {
    return res.send({ error: "invalid credential" });
  }

  if (!userExist.isVerified) {
    return res.send({ error: "Please Verify Your Email First" });
  }

  const isPasswordMatch = await bcrypt.compare(password, userExist.password);

  if (!isPasswordMatch) {
    return res.send({ error: "invalid credential" });
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
    res.send({ error: error });
    console.log(error);
  }
};


//  new ========= refresh token controller =========
const refreshTokenController = async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.send({ error: "Refresh token not found" });
  }

  try {
    const userExist = await User.findOne({ refreshToken: token });
    console.log(userExist.refreshToken);
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
};


// new ========= forgotten password controller =========
const forgotPasswordController = async (req, res) => {
  const email = req.body?.email

  if (!email) {
    return res.send({error: "Please Enter Your Email"})
  }
  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    return res.send({ error: "User not found" });
  }

  try {
    const resetToken = jwt.sign(
      { id: userExist._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.CLIENT_URL}/api/auth/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: userExist.email,
      subject: `Dear ${userExist.username}, Please Reset Your Password.`,
      html: `<h3>Please Reset Your Password</h3> <br> <a href="${resetLink}">Click to Reset</a> `,
    });

    res.send({ massage: "Please Check Email for reset Your Password" });
  } catch (error) {
    res.send({ error: error });
    console.log(error);
  }
};


// new ========= reset password controller =========
const resetPasswordController = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    const userExist = await User.findById(decoded.id)

    if (!userExist) {
      return res.send({error: "Invalid token"})
    }

    userExist.password = await bcrypt.hash(password, 10)
    await userExist.save()
    res.send({massage: "Password Reset Successfully"})
  } catch (error) {
    res.send({error: "Invalid token or Expired"})
  }
};

module.exports = {
  registrationController,
  loginController,
  emailVerificationController,
  refreshTokenController,
  resetPasswordController,
  forgotPasswordController,
};
