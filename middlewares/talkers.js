const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const TALKER_NOT_FOUND = 'Pessoa palestrante não encontrada';

const getAllTalkers = async (_req, res) => {
  try {
    const allTalkers = await fs.readFile('./talker.json', 'utf8');
    if (!allTalkers) return res.status(HTTP_OK_STATUS).json([]);
    return res.status(HTTP_OK_STATUS).json(JSON.parse(allTalkers));
  } catch (err) {
    return res.status(BAD_REQUEST).json(err);
  }
};

const getTalkerById = async (req, res) => {
  try {
    const responseJson = await fs.readFile('./talker.json', 'utf8');
    const responseArray = JSON.parse(responseJson);
    const { id } = req.params;
    const talkerFound = responseArray.find((talker) => talker.id === Number(id));
    if (!talkerFound) return res.status(NOT_FOUND).json({ message: TALKER_NOT_FOUND });
    return res.status(HTTP_OK_STATUS).json(talkerFound);
  } catch (err) {
    return res.status(BAD_REQUEST).json(err);
  }
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};
