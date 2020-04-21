import React from 'react';
import ShelfChanger from './ShelfChanger';

const bookTop = props => {
  // set background to book cower img or show the <p> element if it is not awailable
  const background = props.book.imageURL ? `url(${props.book.imageURL})` : null;
  const text = props.book.imageURL ? null : (
    <p style={{ textAlign: 'center', color: 'red' }}>No preview available for this book.</p>
  );

  return (
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 188, background }}>
        {text}
      </div>
      {/* pass down the methods needed for changing book shelves adding and removing book to ShelfChanger.js */}
      <ShelfChanger
        book={props.book}
        setValueHandler={props.setValueHandler}
        handleBookActions={props.handleBookActions}
      />
    </div>
  );
};

export default bookTop;
