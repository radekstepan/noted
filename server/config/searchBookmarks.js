const {FIELDS} = require('./const');

module.exports = () => ({
  _source: FIELDS,
  query: {
    exists: {
      field: 'bookmarks'
    }
  },
  size: 1e4
});
