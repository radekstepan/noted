module.exports = filename => ({
  _source: ['filename', 'date', 'title', 'body'],
  query: {
    term: {
      filename
    }
  },
  size: 1
});
