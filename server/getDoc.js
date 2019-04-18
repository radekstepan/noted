const error = require('serialize-error');

const searchByName = require('./config/searchByName');
const {mapDoc} = require('./mapHit');

module.exports = api => async (req, res) => {
  const {params: {id}} = req;

  try {
    try {
      // Try using doc id.
      const {data} = await api.get(`/noted/_doc/${id}`);
      return res.json(mapDoc(data));
    } catch (err) {
      // Search for the filename then.
      const {data: {hits: {hits}}} = await api.post('/noted/_search', searchByName(id));
      if (!hits.length) {
        throw new Error(`Document '${id}' does't exist`);
      }
      return res.json(mapDoc(hits[0]));
    }
  } catch (err) {
    res.status(500);
    res.json({error: error(err).message});
  }
};
