import books from './books';

describe('models/books', () => {
  test('adds a book', () => {
    const book = {title: 'Design Patterns', author: 'Gang of Four' };
    const state = books.reducers.addBook(books.state, book);

    expect(state).toEqual({
      'book': null,
      'last': 0,
      'map': {
        '0': {
          'author': 'Gang of Four',
          'isbn': 'isbn:0000',
          'title': 'Design Patterns'
        }
      }
    });
  });
});
