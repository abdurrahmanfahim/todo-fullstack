const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
})


const generateAccessToken = (user) => {
  return jwt.sign({id: user._id}, process.env.JWT_ACCESS_TOKEN, {expiresIn: '15m'})
}

const generateRefreshToken = (user) =>{
  return jwt.sign({id: user._id}, process.env.JWT_REFRESH_TOKEN, {expiresIn: '365d'})

}

const registrationController = async (req, res) => {
  const { username, email, password } = req.body

  const emailExist = await User.findOne({ email: email })
  
  if (emailExist) {
    return res.send({error: `${emailExist.email} already exist`})
  }
  
  const hashed = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    email,
    password: hashed,
    isVerified: false,
  })

  try {
    await user.save()

    const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1d' })
    const verifyLink = `${process.env.CLIENT_URL}/api/auth/verify/${verificationToken}`
    
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: `Dear ${user.username}, Please Verify Your Email.`,
      html: `<h3>Please Verify Your Email</h3> <br> <a href="${verifyLink}">Click to Verify</a> `
    })


    res.send({massage: "registration successful, please check your email"})
    
  } catch (error) {
    res.send({error: error})
  }
  
}



const RegistrationTokenController = async (req, res) => {
  const { token } = req.params
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
    const userExist = await User.findById(decoded.id)
    if (!userExist) {
      return res.send({error: "invalid token"})
    }
    userExist.isVerified = true

    await userExist.save()

    res.send({massage: "Email Verified Successful"})
  } catch (error) {
    res.send({ error: "invalid token or expired" })
    console.log(error)
  }
}



const loginController = async (req, res) => {
  const { email, password } = req.body
  
  const userExist = await User.findOne({ email: email })

  if (!userExist) {
    return res.send({error: "invalid credential"})
  }

  if (!userExist.isVerified) {
    return res.send({error: "Please Verify Your Email First"})
  }

  const isPasswordMatch = await bcrypt.compare(password, userExist.password)

  if (!isPasswordMatch) {
    return res.send({error: "invalid credential"})
  } 

  const accessToken = generateAccessToken(userExist)
  const refreshToken = generateRefreshToken(userExist)

  userExist.refreshToken = refreshToken
  
  await userExist.save()

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 365 * 24 * 60 * 60 * 1000 // one year validation
  })

  res.send({
    massage: "Login Successful",
    accessToken: accessToken,
    username: userExist.username,
    email: userExist.email
  })


}













module.exports = {registrationController, loginController, RegistrationTokenController}