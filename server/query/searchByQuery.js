const {PAGE_LIMIT, FRAGMENT_SIZE, ALL_FIELDS} = require('../const');

const query = q => ({
  query_string: {
    query: q.replace(/[^\w\s]/gi, ''),
    fields: ['title^10', 'body.english'],
    analyzer: 'english_noted',
    fuzziness: 'AUTO',
    lenient: true,
    phrase_slop: 50
  }
});

module.exports.all = (q, from) => ({
  _source: ALL_FIELDS,
  query: query(q),
  size: PAGE_LIMIT,
  from: PAGE_LIMIT * from,
  highlight: {
    type: 'plain',
    fragment_size: FRAGMENT_SIZE,
    number_of_fragments: 1,
    fields: {
      'title': {},
      'body.english': {}
    }
  }
});

module.exports.one = (q, from) => ({
  _source: ALL_FIELDS,
  query: query(q),
  size: 1,
  from,
  highlight: {
    type: 'plain',
    number_of_fragments: 0,
    fields: {
      'title': {},
      'body.english': {}
    }
  }
});
