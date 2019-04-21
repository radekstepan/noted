const query = require('./query/searchByName');
const {mapDoc} = require('./utils/mapHit');

module.exports = api => async (req, res) => {
  const {params: {id}} = req;

  try {
    // Try using doc id.
    const {data} = await api.get(`/noted/_doc/${id}`);
    res.json(mapDoc(data));
  } catch (err) {
    // Search for the filename then.
    const {
      data: {
        hits: {
          hits
        }
      }
    } = await api.post('/noted/_search', query(id));

    if (!hits.length) {
      throw new Error(`Document '${id}' does't exist`);
    }
    res.json(mapDoc(hits[0]));
  }
};
