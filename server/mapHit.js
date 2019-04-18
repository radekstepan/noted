const trunc = require('smart-truncate');

const {FRAGMENT_SIZE} = require('./config/const');

module.exports.mapSearch = hit => ({
  id: hit._id,
  score: hit._score,
  filename: hit._source.filename,
  date: hit._source.date.datetime,
  bookmarks: hit._source.bookmarks,
  title: hit._source.title,
  body: hit.highlight['body.english'].join('&hellip; ')
});

module.exports.mapDoc = hit => ({
  id: hit._id,
  filename: hit._source.filename,
  date: hit._source.date.datetime,
  bookmarks: hit._source.bookmarks,
  title: hit._source.title,
  body: hit._source.body
});

module.exports.truncate = hit => ({
  ...hit,
  body: trunc(hit.body, FRAGMENT_SIZE)
});
