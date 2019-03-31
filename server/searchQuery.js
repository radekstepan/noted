const error = require('serialize-error');

const query = require('./config/searchQuery');
const {mapDoc} = require('./mapHit');

const {PAGE_LIMIT} = require('./config/const');

module.exports = api => async (req, res) => {
  const {query: {q, page}} = req;

  const from = page ? parseInt(page, 10) : 1;

  try {
    const {data: {hits: {total, hits}}} = await api.post('/noted/doc/_search', query(q, from - 1));
    if (total && !hits.length) {
      throw new Error(`Page ${page} doesn't exist`);
    }

    res.json({
      total,
      page: from,
      pages: Math.ceil(total / PAGE_LIMIT),
      limit: PAGE_LIMIT,
      hits: hits.map(mapDoc)
    });
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message, q});
  }
};
