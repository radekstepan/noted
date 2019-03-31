const error = require('serialize-error');

const {one: searchQuery} = require('./config/searchQuery');
const {one: searchDate} = require('./config/searchDate');
const {mapDoc, mapDate} = require('./mapHit');

const {PAGE_LIMIT} = require('./config/const');

module.exports = api => async (req, res) => {
  const {query: {q, date, page, index}} = req;

  try {
    if (!q && !date) {
      throw new Error('Either `q` or `date` parameter has to be provided');
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

    // Text query.
    if (q) {
      const {data: {hits: {hits}}} = await api.post('/noted/doc/_search', searchQuery(q, from));

      if (!hits.length) {
        throw new Error(`Document on page '${page}' index '${index}' does't exist`);
      }

      return res.json(mapDoc(hits[0]));
    }

    // Date query.
    const [month, day] = date.split('-').map(d => parseInt(d, 10));
    if (month < 1 || month > 12) {
      throw new Error(`Month ${month} is invalid`);
    }
    if (day < 1 || day > 31) {
      throw new Error(`Day ${day} is invalid`);
    }

    const {data: {hits: {hits}}} = await api.post('/noted/doc/_search', searchDate(month, day, from));

    if (!hits.length) {
      throw new Error(`Document on page '${page}' index '${index}' does't exist`);
    }

    return res.json(mapDate(hits[0]));
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message});
  }
};
