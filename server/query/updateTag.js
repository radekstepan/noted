module.exports = tag => ({
  script: {
    source: `if (!ctx._source.tags.contains(params.tag)) {
      ctx._source.tags.add(params.tag)
    }`,
    lang: 'painless',
    params: {
      tag
    }
  }
});
