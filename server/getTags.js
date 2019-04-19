const query = require('./query/getTags');
const {mapDoc, truncate} = require('./utils/mapHit');

module.exports = api => async (req, res) => {
  const {data: {hits: {total: {value: total}, hits}}} = await api.post('/noted/_search', query());

  const tags = hits.reduce((tags, hit) => {
    hit._source.tags.forEach(tag => {
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(truncate(mapDoc(hit)));
    });
    return tags;
  }, {});

  res.json({
    total,
    tags
  });
};
