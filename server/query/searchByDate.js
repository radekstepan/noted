const {ALL_FIELDS, MAX_SIZE} = require('../const');

module.exports = (month, day) => ({
  _source: ALL_FIELDS,
  query: {
    nested: {
      path: 'date',
      query: {
        bool: {
          must: [{
            match: {
              'date.month': month
            }
          }, {
            match: {
              'date.day': day
            }
          }]
        }
      }
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
  size: MAX_SIZE
});
