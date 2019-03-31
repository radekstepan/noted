const trunc = require('smart-truncate');

module.exports.mapDoc = hit => ({
  id: hit._id,
  score: hit._score,
  filename: hit._source.filename,
  date: hit._source.date.datetime,
  title: hit._source.title,
  body: hit.highlight['body.english'].join('&hellip; ')
});

module.exports.mapDate = hit => ({
  id: hit._id,
  filename: hit._source.filename,
  date: hit._source.date.datetime,
  title: hit._source.title,
  body: hit._source.body
});

module.exports.truncate = hit => ({
  ...hit,
  body: trunc(hit.body, 300)
});
