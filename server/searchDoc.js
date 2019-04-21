const {one: query} = require('./query/searchByQuery');
const {mapSearch} = require('./utils/mapHit');

const {PAGE_LIMIT, MAX_SIZE} = require('./const');

module.exports = api => async (req, res) => {
  const {query: {q, page, index}} = req;

  if (!q) {
    throw new Error('Missing `q` parameter');
  }
  if (!page) {
    throw new Error(`Missing 'page' parameter`);
  }
  if (!index) {
    throw new Error(`Missing 'index' parameter`);
  }

  const from = PAGE_LIMIT * (parseInt(page, 10) - 1) + parseInt(index, 10) - 1;
  if (from >= MAX_SIZE) {
    throw new Error(`Request window ${from} is too large`);
  }

  const {
    data: {
      hits: {
        hits
      }
    }
  } = await api.post('/noted/_search', query(q, from));

  if (!hits.length) {
    throw new Error(`Document on page '${page}' index '${index}' does't exist`);
  }

  res.json(mapSearch(hits[0]));
};
