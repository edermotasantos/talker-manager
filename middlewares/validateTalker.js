const fs = require('fs').promises;
const token = require('./token');

const {
  BAD_REQUEST,
  UNAUTHORIZED,
  INVALID_TOKEN,
  NOT_FOUND_TOKEN,
  NAME_IS_REQUIRED,
  INVALID_NAME,
  AGE_IS_REQUIRED,
  INVALID_AGE,
  VALID_DATE_FORMAT,
  INVALID_FORMAT,
  INVALID_RATE,
  TALK_IS_REQUIRED,
} = require('./messages');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(UNAUTHORIZED).json({ message: NOT_FOUND_TOKEN });
  if (authorization !== token) return res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN });
  next();
};

const validName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(BAD_REQUEST).json({ message: NAME_IS_REQUIRED });
  if (name.length < 3) return res.status(BAD_REQUEST).send({ message: INVALID_NAME });
  next();
};

const validAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(BAD_REQUEST).send({ message: AGE_IS_REQUIRED });
  if (age < 18) return res.status(BAD_REQUEST).send({ message: INVALID_AGE });
  next();
};

/**
 * Consultei o repositório do Julio Filizzola para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-011-project-talker-manager/pull/7/commits/2fd249c5dd756ff0d3d65d4f28b2f64351c58636
 */

const validRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk && (talk.rate < 1 || talk.rate > 5)) {
    return res.status(BAD_REQUEST).send({
      message: INVALID_RATE,
    });
  }
  next();
};

const validTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(BAD_REQUEST).send({
      message: TALK_IS_REQUIRED,
    });
  }
  next();
};

const validDate = (req, res, next) => {
  const { talk } = req.body;
  if (!VALID_DATE_FORMAT.test(talk.watchedAt)) {
    return res.status(BAD_REQUEST).send({ message: INVALID_FORMAT });
  }
  next();
};

module.exports = {
  tokenValidation,
  validName,
  validAge,
  validRate,
  validTalk,
  validDate,
};