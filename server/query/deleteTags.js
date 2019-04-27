module.exports = () => ({
  script: {
    source: 'ctx._source.tags = []',
    lang: 'painless'
  },
  query: {
    exists: {
      field: 'tags'
    }
  }
});
