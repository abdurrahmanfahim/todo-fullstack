const { registrationController, loginController, RegistrationTokenController } = require('../controllers/authController')
const registrationValidator = require('../middlewares/registrationValidator')

const router = require('express').Router()

router.post('/registration', registrationValidator, registrationController
)

router.get('/verify/:token', RegistrationTokenController)

router.post('/login', loginController)



module.exports = router