const registrationValidator = (req, res, next) => {
  const { username, email, password } = req.body
  
  const errors = {}
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isValid = emailPattern.test(email)

  if (username) {
    if (username.length < 3) {
      errors.username = "username must be at least 3 characters"
    }
    if (username.length > 15) {
      errors.username = "username must be less than 15 characters"
    }
  } else {
    errors.username = "username is required"
  }

  if (email) {
    if (!isValid) {
      errors.email = 'email is not valid'
    }
  } else {
    errors.email = "email is required"
  }

  if (password) {
    if (password.length < 6) { 
      errors.password = "password must be at least 6 characters"
    }
    if (password.length > 20) { 
      errors.password = "password must be less than 20 characters"
    }
  } else {
    errors.password = "password is required"
  }

  if (errors.username || errors.email || errors.password) {
    res.send({error: errors})
  } else {
    next()
  }


}

module.exports = registrationValidator