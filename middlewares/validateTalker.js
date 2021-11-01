const token = require('./token');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const INVALID_TOKEN = 'Token inválido';
const NOT_FOUND_TOKEN = 'Token não encontrado';
const NAME_IS_REQUIRED = 'O campo "name" é obrigatório';
const INVALID_NAME = 'O "name" deve ter pelo menos 3 caracteres';
const AGE_IS_REQUIRED = 'O campo "age" é obrigatório';
const INVALID_AGE = 'A pessoa palestrante deve ser maior de idade';
const VALID_DATE = /^[\d]{2}\/[\d]{2}\/[\d]{4}$/;
const INVALID_FORMAT = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const INVALID_RATE = 'O campo "rate" deve ser um inteiro de 1 à 5';
const TALK_IS_REQUIRED = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';

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

const validTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(BAD_REQUEST).send({
      message: TALK_IS_REQUIRED,
    });
  }
  if (!VALID_DATE.test(talk.watchedAt)) {
    return res.status(BAD_REQUEST).send({ message: INVALID_FORMAT });
  }
  next();
};

const validRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(BAD_REQUEST).send({
      message: INVALID_RATE,
    });
  }
  next();
};

module.exports = {
  tokenValidation,
  validName,
  validAge,
  validTalk,
  validRate,
}; 
