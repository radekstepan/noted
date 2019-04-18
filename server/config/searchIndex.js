module.exports = () => ({
  mappings: {
    properties: {
      filename: {
        type: 'keyword'
      },
      date: {
        type: 'nested',
        properties: {
          datetime: {
            type: 'date'
          },
          year: {
            type: 'short'
          },
          month: {
            type: 'short'
          },
          day: {
            type: 'short'
          }
        }
      },
      bookmarks: {
        type: 'keyword'
      },
      title: {
        type: 'text'
      },
      body: {
        type: 'text',
        fields: {
          english: {
            type: 'text',
            analyzer: 'english_noted'
          }
        }
      }
    }
  },
  settings: {
    analysis: {
      filter: {
        english_stemmer: {
          type: 'stemmer',
          language: 'english'
        },
        english_possessive_stemmer: {
          type: 'stemmer',
          language: 'possessive_english'
        }
      },
      analyzer: {
        english_noted: {
          tokenizer: 'standard',
          filter: [
            'english_possessive_stemmer',
            'lowercase',
            'english_stemmer'
          ]
        }
      }
    }
  }
});
