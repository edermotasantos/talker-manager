const express = require('express');

const router = express.Router();
const { getAllTalkers, getTalkerById } = require('../middlewares/validateTalkers');

router.get('/talker', getAllTalkers);
router.get('/talker/:id', getTalkerById);

module.exports = router;
