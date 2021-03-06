const trunc = require('smart-truncate');

const {FRAGMENT_SIZE} = require('../const');

module.exports.mapSearch = (hit, truncate = true) => ({
  id: hit._id,
  score: hit._score,
  filename: hit._source.filename,
  date: hit._source.date.datetime,
  tags: hit._source.tags,
  title: hit._source.title,
  body: hit.highlight['body.english'] ?
    hit.highlight['body.english'].join('&hellip; ') :
    truncate ? trunc(hit._source.body, FRAGMENT_SIZE) : hit._source.body
});

module.exports.mapDoc = hit => ({
  id: hit._id,
  filename: hit._source.filename,
  date: hit._source.date.datetime,
  tags: hit._source.tags,
  title: hit._source.title,
  body: hit._source.body
});

module.exports.truncate = hit => ({
  ...hit,
  body: trunc(hit.body, FRAGMENT_SIZE)
});
