const error = require('serialize-error');

const query = require('./config/searchIndex');

module.exports = api => async (req, res) => {
  try {
    await api.delete('/noted');
  } catch (err) {
    // Silently fail if index doesn't exist.
  }

  try {
    await api.put('/noted', query());
    res.status(204).send({});
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message});
  }
}
