import React from 'react';

const shelfChanger = props => {
  let value = props.setValueHandler(props.book.id)[0];
  if (value === undefined) {
    value = 'none';
  }

  return (
    <div className="book-shelf-changer">
      <select value={value} onChange={e => props.handleBookActions(e.target.value, props.book)}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default shelfChanger;
