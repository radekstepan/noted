const {ALL_FIELDS} = require('../const');

module.exports = filename => ({
  _source: ALL_FIELDS,
  query: {
    term: {
      filename
    }
  },
  size: 1
});
