import React from 'react';
import Books from './Books';
import Book from './Book';
// takes book that belong to the shelf as props and render Book.js for each book
const shelv = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.children}</h2>
    <Books>
      {props.books.length > 0 ? (
        props.books.map(book => (
          <Book
            book={book}
            setValueHandler={props.setValueHandler}
            handleBookActions={props.handleBookActions}
            key={book.title}
          />
        ))
      ) : (
        <p>This shelf is currently empty.</p>
      )}
    </Books>
  </div>
);

export default shelv;
