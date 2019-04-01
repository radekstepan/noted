const {PAGE_LIMIT} = require('./const');

const _source = ['filename', 'date', 'title'];

const query = q => ({
  query_string: {
    query: q,
    fields: ['title^3', 'body.english'],
    analyzer: 'english_noted',
    fuzziness: 'AUTO',
    default_operator: 'AND',
    lenient: true,
    phrase_slop: 50
  }
});

module.exports.all = (q, from) => ({
  _source,
  query: query(q),
  size: PAGE_LIMIT,
  from: PAGE_LIMIT * from,
  highlight: {
    type: 'plain',
    fragment_size: 100,
    number_of_fragments: 5,
    fields: {
      'body.english': {}
    }
  }
});

module.exports.one = (q, from) => ({
  _source,
  query: query(q),
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
