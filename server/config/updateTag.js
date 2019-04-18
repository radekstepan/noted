module.exports = tag => ({
  script: {
    source: `if (!ctx._source.bookmarks.contains(params.tag)) {
      ctx._source.bookmarks.add(params.tag)
    }`,
    lang: 'painless',
    params: {
      tag
    }
  }
});
