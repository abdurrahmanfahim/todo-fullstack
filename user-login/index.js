require('dotenv').config
const express = require('express')
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')


const app = express()
app.use('api/auth', authRouter)
app.use(cookieParser)

const PORT = process.env.PORT || 7000







app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})


