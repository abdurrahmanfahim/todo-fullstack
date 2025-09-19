require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const databaseConfig = require('./config/databaseConfig')
const authRouts = require('./routes/authRoutes')
const app = express()

databaseConfig()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use('/api/auth', authRouts)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log('server is running on port ' + PORT)
})

