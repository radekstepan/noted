const {ALL_FIELDS} = require('../const');

module.exports = () => ({
  _source: ALL_FIELDS,
  query: {
    exists: {
      field: 'tags'
    }
  },
  size: 1e4
});
