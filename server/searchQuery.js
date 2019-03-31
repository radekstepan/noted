const error = require('serialize-error');
const {all: merge} = require('deepmerge');

const query = require('../config/searchQuery');
const mapHit = require('./mapHit');

const {PAGE_LIMIT} = require('../config/const');

module.exports = api => async (req, res) => {
  const {query: {q, page}} = req;

  const from = page ? parseInt(page, 10) : 1;

  try {
    const {data: {hits: {total, hits}}} = await api.post('/noted/doc/_search', merge([
      query,
      {query: {query_string: {query: q}}},
      {from: PAGE_LIMIT * (from - 1)}
    ]));

    if (total && !hits.length) {
      throw new Error(`Page ${page} doesn't exist`);
    }

    res.json({
      total,
      page: from,
      pages: Math.ceil(total / PAGE_LIMIT),
      limit: PAGE_LIMIT,
      hits: hits.map(mapHit)
    });
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message, q});
  }
};
