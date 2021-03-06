const query = require('./query/getTags');
const {mapDoc, truncate} = require('./utils/mapHit');

module.exports = api => async (req, res) => {
  const {
    data: {
      hits: {
        total: {
          value: total
        },
        hits
      }
    }
  } = await api.post('/noted/_search', query());

  res.json({
    total,
    tags: hits.map(mapDoc).map(truncate)
  });
};
