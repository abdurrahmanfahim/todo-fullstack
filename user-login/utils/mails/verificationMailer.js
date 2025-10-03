const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});


const mailUserForVerify = async (user) => {
  const verificationToken = jwt.sign(
    { id: user._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1d" }
  );
  const verifyLink = `${process.env.CLIENT_URL}/api/auth/verify-email/${verificationToken}`;
  const info = await transporter.sendMail({
    from: '"Abdur Rahman Fahim" <fahimahmad123go@gmail.com>',
    to: user.email,
    subject: `Hello ${user.username}`,
    text: `Please verify your email!`, // plain‑text body
    html: `<a href="${verifyLink}">click here</a> to verify!`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};


const mailUserForPasswordChange = async (user) => {
  const verificationToken = jwt.sign(
    { id: user._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1d" }
  );
  
  const verifyLink = `${process.env.CLIENT_URL}/api/auth/reset-password/${verificationToken}`;
  const info = await transporter.sendMail({
    from: '"Abdur Rahman Fahim" <fahimahmad123go@gmail.com>',
    to: user.email,
    subject: `Hello ${user.username}`,
    text: `Please, Follow the link to change your Password!`, // plain‑text body
    html: `<a href="${verifyLink}">click here</a> to Change Password!`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};

module.exports = { mailUserForVerify, mailUserForPasswordChange };
