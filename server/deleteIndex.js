const query = require('./query/createIndex');

module.exports = api => async (req, res) => {
  try {
    await api.delete('/noted');
  } catch (err) {
    // Silently fail if index doesn't exist.
  }

  await api.put('/noted', query());
  res.status(204).send({});
}
