require('dotenv').config()
const express = require('express')
const databaseConfig = require('./config/databaseConfig')
const authRouts = require('./routes/authRoutes')
const app = express()

app.use(express.json())
app.use('/api/auth', authRouts)

databaseConfig()

const PORT = 8000
app.listen(PORT, () => {
  console.log('server is running on port ' + PORT)
})

