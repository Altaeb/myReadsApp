import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { throttle } from 'throttle-debounce';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class SearchBooks extends Component {
  state = {
    query: '',
    queryResault: [],
    error: false,
  };

  // create abortControler to be able to cancel api call in componentWillUnmount
  abortController = new AbortController();

  componentWillUnmount() {
    // abort api call if the user navigates from the page before getting the data back
    // prevents setting state on an unmounted component
    this.abortController.abort();
  }

  // throttle the event and call this.bookSearchHandler passing it the event
  throttledBookSearchHandler = e => {
    const event = e;
    throttle(300, this.bookSearchHandler(event));
  };

  // handle the search input
  bookSearchHandler = e => {
    const query = e.target.value;
    this.setState(() => ({ query, error: false }));
    if (query === '') {
      this.setState(() => ({ queryResault: [], error: false }));
      return;
    }
    // call the search data form the API and pass it abortController.signal
    BooksAPI.search(query, this.abortController.signal)
      .then(data => {
        this.setState({
          queryResault: data.map(book => ({
            id: book.id,
            title: book.title,
            authors: book.authors,
            imageURL: book.imageLinks ? book.imageLinks.smallThumbnail : null,
            shelf: book.shelf,
          })),
          error: false,
        });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => this.throttledBookSearchHandler(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {// if searchAPI data got back from the server and the search field in not empty and there is no error render out Book components, else render out the message
            this.state.queryResault && this.state.query && !this.state.error ? (
              this.state.queryResault.map(book => (
                <Book
                  book={book}
                  setValueHandler={this.props.setValueHandler}
                  handleBookActions={this.props.handleBookActions}
                  key={book.id}
                />
              ))
            ) : (
              <h4>To see the resaults type in the search field.</h4>
            )}
          </ol>
          {// if there is an error show the error message
          this.state.error && (
            <h4 style={{ textAlign: 'center' }}>
              Please enter a
              <a
                href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                valid search tearm
              </a>
              !
            </h4>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
