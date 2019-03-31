const error = require('serialize-error');
const {all: merge} = require('deepmerge');

const query = require('../config/searchDoc');
const mapHit = require('./mapHit');

const {PAGE_LIMIT} = require('../config/const');

module.exports = api => async (req, res) => {
  const {query: {q, page, index}} = req;

  try {
    if (!q) {
      throw new Error(`Missing 'q' parameter`);
    }
    if (!page) {
      throw new Error(`Missing 'page' parameter`);
    }
    if (!index) {
      throw new Error(`Missing 'index' parameter`);
    }

    const from = PAGE_LIMIT * (parseInt(page, 10) - 1) + parseInt(index, 10) - 1;
    if (from >= 10000) {
      throw new Error(`Request window ${from} is too large`);
    }

    const {data: {hits: {hits}}} = await api.post('/noted/doc/_search', merge([
      query,
      {query: {query_string: {query: q}}},
      {from}
    ]));

    if (!hits.length) {
      throw new Error(`Document on page '${page}' index '${index}' does't exist`);
    }

    res.json(mapHit(hits[0]));
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message, q});
  }
};
