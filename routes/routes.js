const express = require('express');
const token = require('../middlewares/token');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

const {
  getAllTalkers,
  getTalkerById,
} = require('../middlewares/talkers');

const {
    emailIsValid,
    passwordIsValid,  
  } = require('../middlewares/login');

const HTTP_OK_STATUS = 200;

router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);
router.post('/login', emailIsValid, passwordIsValid,
(_req, res) => res.status(HTTP_OK_STATUS).json({ token }));

module.exports = router;
