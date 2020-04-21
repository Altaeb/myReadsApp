import React from 'react';

const bookBottom = props => (
  <React.Fragment>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">{[...props.book.authors].join(', ')}</div>
  </React.Fragment>
);

export default bookBottom;
