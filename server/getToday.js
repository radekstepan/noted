const query = require('./query/searchByDate');
const {mapDoc, truncate} = require('./utils/mapHit');

module.exports = api => async (req, res) => {
  const d = new Date();
  const {
    data: {
      hits: {
        total: {
          value: total
        },
        hits
      }
    }
  } = await api.post('/noted/_search', query(d.getMonth() + 1, d.getDate()));

  res.json({
    total,
    docs: hits.map(mapDoc).map(truncate)
  });
};
