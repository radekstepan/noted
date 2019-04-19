const {ALL_FIELDS} = require('../const');

module.exports = () => ({
  _source: ALL_FIELDS,
  query: {
    exists: {
      field: 'tags'
    }
  },
  sort: [
    {
      'date.datetime': {
        order: 'desc',
        mode: 'avg',
        nested: {
          path: 'date'
        }
      }
    }
  ],
  size: 1e4
});
