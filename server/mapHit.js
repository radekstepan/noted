module.exports.mapDoc = hit => ({
  id: hit._id,
  score: hit._score,
  filename: hit._source.filename,
  date: hit._source.date.datetime,
  title: hit._source.title,
  body: hit.highlight['body.english']
});

module.exports.mapDate = hit => ({
  id: hit._id,
  filename: hit._source.filename,
  date: hit._source.date.datetime,
  title: hit._source.title,
  body: hit._source.body
});
