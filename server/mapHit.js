module.exports = hit => ({
  id: hit._id,
  score: hit._score,
  filename: hit._source.filename,
  date: hit._source.date,
  title: hit._source.title,
  body: hit.highlight['body.english']
});
