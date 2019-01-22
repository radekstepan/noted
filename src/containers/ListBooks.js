import React from 'react';
import {connect} from 'react-redux';

import Book from '../components/Book';

const ListBooks = props => (
  <div id="main">
    <div className="header">
      <div className="title">Book list</div>
      <div className="action">
        <input
          type="button"
          className="button"
          value="Add a Book"
          onClick={() => props.navigate('/add')} />
      </div>
    </div>
    <div className="panel">
      <div className="books">
        {props.books.map(book => <Book
          {...book}
          key={book.idx}
          viewDetail={() => props.navigate(`/book/${book.idx}`)} />)}
      </div>
    </div>
  </div>
);

const mapState = state => {
  const {books: {map}} = state;
  const books = Object.keys(map).reduce((books, idx) => [...books, {...map[idx], idx}], []);

  return {books};
};

const mapDispatch = dispatch => ({
  navigate: dispatch.router.navigate
});

export default connect(mapState, mapDispatch)(ListBooks);
