module.exports = (query, from) => ({
  _source: [
    'filename',
    'date',
    'title'
  ],
  query: {
    query_string: {
      query,
      fields: [
        'title^3',
        'body.english'
      ],
      analyzer: 'english_noted',
      fuzziness: 'AUTO',
      default_operator: 'AND',
      lenient: true,
      phrase_slop: 50
    }
  },
  size: 1,
  from,
  highlight: {
    type: 'plain',
    number_of_fragments: 0,
    fields: {
      'body.english': {}
    }
  }
});
