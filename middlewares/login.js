const BAD_REQUEST = 400;
const EMAIL_IS_REQUIRED = 'O campo "email" é obrigatório';
const INVALID_EMAIL = 'O "email" deve ter o formato "email@email.com"';
const PASSWORD_IS_REQUIRED = 'O campo "password" é obrigatório';
const INVALID_PASSWORD = 'O "password" deve ter pelo menos 6 caracteres';

/** Source: https://github.com/tryber/sd-011-project-talker-manager/pull/7/commits/ae75ec13b617896272806d9c44bc51cf9777e1c6 */
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
