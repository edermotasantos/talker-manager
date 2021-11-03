const fs = require('fs').promises;

const { HTTP_OK_STATUS, TALKER_WAS_DELETED } = require('./messages');

const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const talkerJson = await fs.readFile('./talker.json', 'utf-8');
    const talker = JSON.parse(talkerJson);
    const response = talker.find((value) => value.id !== Number(id));
    const responseJson = JSON.stringify(response);
    await fs.writeFile('./talker.json', responseJson);
    res.status(HTTP_OK_STATUS).send({ message: TALKER_WAS_DELETED });
  };

module.exports = deleteTalker;
