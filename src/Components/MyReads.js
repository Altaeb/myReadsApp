import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

class MyReads extends Component {
  render() {
    // sort books from props to shelves based on book.shelf
    const shelves = [
      {
        shelf: 'Currently Reading',
        books: this.props.books.filter(book => book.shelf === 'currentlyReading'),
      },
      {
        shelf: 'Want to Read',
        books: this.props.books.filter(book => book.shelf === 'wantToRead'),
      },
      {
        shelf: 'Read',
        books: this.props.books.filter(book => book.shelf === 'read'),
      },
    ];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {// map over shelves to render out the shelves and passes the shelf books
            shelves.map(shelf => (
              <Shelf
                books={shelf.books}
                setValueHandler={this.props.setValueHandler}
                handleBookActions={this.props.handleBookActions}
                key={shelf.shelf}
              >
                {shelf.shelf}
              </Shelf>
            ))}
          </div>
        </div>
        <Link to="/search">
          <div className="open-search">
            <button type="button">Add a book</button>
          </div>
        </Link>
      </div>
    );
  }
}

export default MyReads;
