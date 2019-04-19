const query = require('./query/getTags');
const {mapDoc} = require('./utils/mapHit');

module.exports = api => async (req, res) => {
  const {data: {hits: {total: {value: total}, hits}}} = await api.post('/noted/_search', query());
  res.json({
    total,
    hits: hits.map(mapDoc)
  });
};
