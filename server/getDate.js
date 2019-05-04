const query = require('./query/searchByDate');
const {mapDoc, truncate} = require('./utils/mapHit');

module.exports = api => async (req, res) => {
  const {query: {month, day}} = req;

  if (!month || month > 12 || month < 1) {
    throw new Error('Missing `month` parameter');
  }
  if (!day || day > 31 || day < 1) {
    throw new Error('Missing `day` parameter');
  }

  const {
    data: {
      hits: {
        total: {
          value: total
        },
        hits
      }
    }
  } = await api.post('/noted/_search', query(month, day));

  res.json({
    total,
    docs: hits.map(mapDoc).map(truncate)
  });
};
