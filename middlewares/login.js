const {
  BAD_REQUEST,
  EMAIL_IS_REQUIRED,
  INVALID_EMAIL,
  PASSWORD_IS_REQUIRED,
  INVALID_PASSWORD,
} = require('./messages');


const emailIsValid = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(BAD_REQUEST).send({ message: EMAIL_IS_REQUIRED });
  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(BAD_REQUEST).send({ message: INVALID_EMAIL });
  }
  next();
};

const passwordIsValid = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(BAD_REQUEST).send({ message: PASSWORD_IS_REQUIRED });
  if (password.length < 6) return res.status(BAD_REQUEST).send({ message: INVALID_PASSWORD });
  next();
};

module.exports = {
  passwordIsValid,
  emailIsValid,
};
