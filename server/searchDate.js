const error = require('serialize-error');

const query = require('./config/searchDate');
const {mapDate} = require('./mapHit');

module.exports = api => async (req, res) => {
  const {query: {month, day}} = req;

  try {
    if (!month || isNaN(parseInt(month, 10))) {
      throw new Error(`Missing or malformed 'month' parameter`);
    }
    if (!day || isNaN(parseInt(day, 10))) {
      throw new Error(`Missing or malformed 'day' parameter`);
    }

    const {data: {hits: {total, hits}}} = await api.post('/noted/doc/_search', query(month, day));

    res.json({
      total,
      page: 1,
      pages: 1,
      limit: 100,
      hits: hits.map(mapDate)
    });
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message, q});
  }
};
