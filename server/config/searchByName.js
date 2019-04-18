const {FIELDS} = require('./const');

module.exports = filename => ({
  _source: FIELDS,
  query: {
    term: {
      filename
    }
  },
  size: 1
});
