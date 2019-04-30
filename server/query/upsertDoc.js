// Create or update a document without removing its tags.
module.exports = params => ({
  script: {
    source: Object.keys(params).map(key =>
      `ctx._source.${key} = params.${key}`
    ).join(';'),
    lang: 'painless',
    params
  },
  upsert: {
    ...params,
    tags: []
  }
});
