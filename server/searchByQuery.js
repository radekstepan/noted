const {all: query} = require('./query/searchByQuery');
const {mapSearch} = require('./utils/mapHit');

const {PAGE_LIMIT} = require('./const');

module.exports = api => async (req, res) => {
  const {query: {q, page}} = req;

  const from = page ? parseInt(page, 10) : 1;

  if (!q) {
    throw new Error('Missing `q` parameter');
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
  } = await api.post('/noted/_search', query(q, from - 1));

  if (total && !hits.length) {
    throw new Error(`Page ${page} doesn't exist`);
  }

  return res.json({
    total,
    page: from,
    pages: Math.ceil(total / PAGE_LIMIT),
    limit: PAGE_LIMIT,
    hits: hits.map(mapSearch)
  });
};
