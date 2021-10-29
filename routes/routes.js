const express = require('express');
const router = express.Router();
const { getAllTalkers } = require('../middlewares/validateTalkers');

router.get('/talker', getAllTalkers);

module.exports = router;
