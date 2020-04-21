import React from 'react';
import BookTop from './BookTop';
import BookBottom from './BookBottom';
// gets a single book as props and renders it out with BookTop.js and BookBottom.js
const book = props => (
  <li>
    <div className="book">
      <BookTop
        book={props.book}
        setValueHandler={props.setValueHandler}
        handleBookActions={props.handleBookActions}
      />
      <BookBottom book={props.book} />
    </div>
  </li>
);
export default book;
