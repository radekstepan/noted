const {PAGE_LIMIT} = require('./const');

module.exports.all = (month, day, from) => ({
  _source: ['filename', 'title', 'date', 'body'],
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
        nested_path: 'date'
      }
    }
  ],
  size: PAGE_LIMIT,
  from: PAGE_LIMIT * from
});

module.exports.one = (month, day, from) => ({
  _source: ['filename', 'title', 'date', 'body'],
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
        nested_path: 'date'
      }
    }
  ],
  size: 1,
  from
});
