const {PAGE_LIMIT, FIELDS} = require('./const');

const query = (month, day) => ({
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
});

const sort = [
  {
    'date.datetime': {
      order: 'desc',
      mode: 'avg',
      nested: {
        path: 'date'
      }
    }
  }
];

module.exports.all = (month, day, from) => ({
  _source: FIELDS,
  query: query(month, day),
  sort,
  size: PAGE_LIMIT,
  from: PAGE_LIMIT * from
});

module.exports.one = (month, day, from) => ({
  _source: FIELDS,
  query: query(month, day),
  sort,
  size: 1,
  from
});
