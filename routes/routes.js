const fs = require('fs').promises;
const express = require('express');
const token = require('../middlewares/token');

const CREATED = 201;

const router = express.Router();

const {
  getAllTalkers,
  getTalkerById,
} = require('../middlewares/talkers');

const {
    emailIsValid,
    passwordIsValid,  
  } = require('../middlewares/login');

const {
  tokenValidation,
  validName,
  validAge,
  validTalk,
  validRate,
} = require('../middlewares/validateTalker');

const HTTP_OK_STATUS = 200;

router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', emailIsValid, passwordIsValid,
(_req, res) => res.status(HTTP_OK_STATUS).json({ token }));

/**
 * Consultei o repositório do Julio Filizzola para resolver essa parte.
 * Link do repositório: https://github.com/tryber/sd-011-project-talker-manager/pull/7/commits/2fd249c5dd756ff0d3d65d4f28b2f64351c58636
 */

router.post('/talker',
  tokenValidation,
  validName,
  validAge,
  validTalk,
  validRate,
  async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkersStringJson = await fs.readFile('./talker.json', 'utf-8');
    const talkersObj = JSON.parse(talkersStringJson);
    const id = talkersObj.length + 1;
    const newTalker = { name, age, id, talk: { watchedAt, rate } };
    talkersObj.push(newTalker);
    const newtalker = JSON.stringify(talkersObj);
    await fs.writeFile('./talker.json', newtalker);
    return res.status(CREATED).json(newTalker);
  });

module.exports = router;
