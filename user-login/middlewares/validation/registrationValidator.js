export const usernameValidator = (req, res, next) => {
  const { username } = req.body;

  const errors = {};

  if (!username) {
    errors.username = "username is required!";
  } else {
    if (username.length < 3) {
      errors.username = "username must be upper 3 chars!";
    }

    if (username.length > 20) {
      errors.username = "username must be above 20 chars!";
    }
  }

  if (errors.username) {
    res.status(422).send({ error: errors });
  } else {
    next();
  }
};

export const emailValidator = (req, res, next) => {
  const { email } = req.body;

  const errors = {};

  if (!email) {
    errors.email = "email is required!";
  } else {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      errors.email = "Invalid Email address!";
    }
  }

  if (errors.email) {
    res.status(422).send({ error: errors });
  } else {
    next();
  }
};

export const passwordValidator = (req, res, next) => {
  const { password } = req.body;

  const errors = {};

  if (!password) {
    errors.password = "password is required!";
  } else {
    if (password.length < 6) {
      errors.password = "password must be minimum 6 chars!";
    }

    if (password.length > 50) {
      errors.password = "password must be under 50 chars!";
    }
  }

  if (errors.password) {
    res.status(422).send({ error: errors });
  } else {
    next();
  }
};

export const confirmPasswordValidator = (req, res, next) => {
  const { confirmPassword } = req.body;

  const errors = {};

  if (!password === confirmPassword) {
    errors.confirmPassword = "Password did Not Match!";
  }

  if (errors.confirmPassword) {
    res.status(422).send({ error: errors });
  } else {
    next();
  }
};
