const books = {
  state: {
    // The map of books.
    map: {},
    // Last book index.
    last: -1,
    // Book instance.
    book: null
  },
  reducers: {
    addBook(state, book) {
      // "Validation".
      if (!book.title || !book.author) {
        return state;
      }

      const idx = state.last + 1;
      book.isbn = `isbn:000${idx}`; // "generate" ISBN

      return {
        ...state,
        last: idx,
        map: {...state.map, [idx]: book}
      };
    },
    getBook(state, idx) {
      return {
        ...state,
        book: idx in state.map ? state.map[idx] : {error: 'Not found'}
      };
    },
    removeBook(state, idx) {
      const {[idx]: book, ...map} = state.map;

      return {
        ...state,
        map,
        book: null
      };
    },
    clearBook(state) {
      return {
        ...state,
        book: null
      };
    }
  },
  effects: {
    async resolveBook(idx) {
      // Clear the cache.
      this.clearBook();
      // Simulate XHR.
      await new Promise((resolve) => {
        setTimeout(() => {
          this.getBook(idx);
          resolve();
        }, 1e3);
      });
    }
  }
};

export default books;
