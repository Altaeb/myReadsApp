import React from 'react';
// wrapper component to wrap the Book.js components for styling the grig
const books = props => (
  <div className="bookshelf-books">
    <ol className="books-grid">{props.children}</ol>
  </div>
);

export default books;
