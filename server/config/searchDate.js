module.exports = (month, day) => ({
  _source: ['filename', 'title', 'date', 'body'],
  query: {
    nested: {
      path: 'date',
      query: {
        bool: {
          must: [
            {
              match: {
                'date.month': month
              }
            }, {
              match: {
                'date.day': day
              }
            }
          ]
        }
      }
    }
  },
  sort: [
    {
      'date.datetime': {
        order: 'desc'
      }
    }
  ],
  size: 100
});
