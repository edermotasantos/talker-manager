const HTTP_OK_STATUS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const PORT = '3000';
const TALKER_NOT_FOUND = 'Pessoa palestrante não encontrada';
const INVALID_TOKEN = 'Token inválido';
const NOT_FOUND_TOKEN = 'Token não encontrado';
const NAME_IS_REQUIRED = 'O campo "name" é obrigatório';
const INVALID_NAME = 'O "name" deve ter pelo menos 3 caracteres';
const AGE_IS_REQUIRED = 'O campo "age" é obrigatório';
const INVALID_AGE = 'A pessoa palestrante deve ser maior de idade';
const VALID_DATE_FORMAT = /^[\d]{2}\/[\d]{2}\/[\d]{4}$/;
const INVALID_FORMAT = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const INVALID_RATE = 'O campo "rate" deve ser um inteiro de 1 à 5';
const TALK_IS_REQUIRED = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const TALKER_WAS_DELETED = 'Pessoa palestrante deletada com sucesso';

module.exports = {
  HTTP_OK_STATUS,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  PORT,
  TALKER_NOT_FOUND,
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
  TALKER_WAS_DELETED,
};
