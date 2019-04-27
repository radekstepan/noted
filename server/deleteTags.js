const query = require('./query/deleteTags');

module.exports = api => async (req, res) => {
  await api.post('/noted/_update_by_query', query());
  res.status(204).send({});
};
