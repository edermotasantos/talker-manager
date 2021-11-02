const fs = require('fs').promises;
const express = require('express');
const token = require('../middlewares/token');
const { CREATED, HTTP_OK_STATUS } = require('../middlewares/messages'); 

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
  validRate,
  validTalk,
  validDate,
  deleteTalker,
} = require('../middlewares/validateTalker');

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
  validRate,
  validTalk,
  validDate,
  async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkersStringJson = await fs.readFile('./talker.json', 'utf-8');
    const talkerArray = JSON.parse(talkersStringJson);
    const id = talkerArray.length + 1;
    const newTalker = { name, age, id, talk: { watchedAt, rate } };
    talkerArray.push(newTalker);
    const newtalker = JSON.stringify(talkerArray);
    await fs.writeFile('./talker.json', newtalker);
    return res.status(CREATED).json(newTalker);
  });

router.put('/talker/:id',
  tokenValidation,
  validName,
  validAge,
  validRate,
  validTalk,
  validDate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkerStrgJsn = await fs.readFile('./talker.json', 'utf-8');
    const talkerArray = JSON.parse(talkerStrgJsn);
    const indexId = talkerArray.findIndex((talker) => talker.id === Number(id));
    talkerArray[indexId] = { 
      ...talkerArray[indexId],
      name,
      age,
      talk: {
        watchedAt,
        rate,
      },
    };
    const nuTalker = talkerArray[indexId];
    const talkerStringfy = JSON.stringify(talkerArray);
    await fs.writeFile('./talker.json', talkerStringfy);
    return res.status(200).json(nuTalker);
  });

  router.delete('/talker/:id', tokenValidation, deleteTalker);

module.exports = router;
