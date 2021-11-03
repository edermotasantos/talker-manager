const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const searchTalker = async (req, res) => {
    const { q } = req.query;
    const talkersJson = await fs.readFile('./talker.json', 'utf-8');
    const talkers = JSON.parse(talkersJson);
    const response = talkers.filter(({ name }) => name.includes(q));
    return res.status(HTTP_OK_STATUS).json(response);
  };

module.exports = searchTalker;
