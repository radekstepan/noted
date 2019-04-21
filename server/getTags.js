const query = require('./query/getTags');
const {mapDoc, truncate} = require('./utils/mapHit');

module.exports = api => async (req, res) => {
  const {data: {hits: {total: {value: total}, hits: tags}}} = await api.post('/noted/_search', query());

  res.json({
    total,
    tags: tags.map(mapDoc).map(truncate)
  });
};
