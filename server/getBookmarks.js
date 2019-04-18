const error = require('serialize-error');

const query = require('./config/searchBookmarks');
const {mapDoc} = require('./mapHit');

module.exports = api => async (req, res) => {
  try {
    const {data: {hits: {total: {value: total}, hits}}} = await api.post('/noted/_search', query());
    res.json({
      total,
      hits: hits.map(mapDoc)
    });
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message});
  }
};
