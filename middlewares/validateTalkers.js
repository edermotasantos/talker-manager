const fs = require('fs').promises;
const HTTP_OK_STATUS = 200;
const BAD_REQUEST = 400;

const getAllTalkers = async (req, res) => {
    try {
      const allTalkers = await fs.readFile('./talker.json', 'utf8');
      if (!allTalkers) return res.status(HTTP_OK_STATUS).json([]);
      return res.status(HTTP_OK_STATUS).json(JSON.parse(allTalkers));
    } catch (err) {
      return res.status(BAD_REQUEST).json(err);
    }
  };

module.exports = { getAllTalkers };
