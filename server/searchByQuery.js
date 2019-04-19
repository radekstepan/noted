const {all: searchQuery} = require('./query/searchByQuery');
const {all: searchDate} = require('./query/searchByDate');
const {mapSearch, mapDoc, truncate} = require('./utils/mapHit');

const {PAGE_LIMIT} = require('./const');

module.exports = api => async (req, res) => {
  const {query: {q, date, page}} = req;

  const from = page ? parseInt(page, 10) : 1;

  if (!q && !date) {
    throw new Error('Either `q` or `date` parameter has to be provided');
  }

  // Text query.
  if (q) {
    const {data: {hits: {total: {value: total}, hits}}} = await api.post('/noted/_search', searchQuery(q, from - 1));
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
  }

  // Date query.
  const [month, day] = date.split('-').map(d => parseInt(d, 10));
  if (month < 1 || month > 12) {
    throw new Error(`Month ${month} is invalid`);
  }
  if (day < 1 || day > 31) {
    throw new Error(`Day ${day} is invalid`);
  }

  const {data: {hits: {total: {value: total}, hits}}} = await api.post('/noted/_search', searchDate(month, day, from - 1));
  if (total && !hits.length) {
    throw new Error(`Page ${page} doesn't exist`);
  }

  res.json({
    total,
    page: from,
    pages: Math.ceil(total / PAGE_LIMIT),
    limit: PAGE_LIMIT,
    hits: hits.map(mapDoc).map(truncate)
  });
};
