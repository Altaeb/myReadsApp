import React from 'react';
import { Route } from 'react-router-dom';
import MyReads from './Components/MyReads';
import SearchBooks from './Components/SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [], // set initial state of book to an empty array
  };

  // create abortControler to be able to cancel api call in componentWillUnmount
  abortController = new AbortController();

  componentDidMount() {
    // call the api with abortControler.signal passed in
    // the function was modified in BookAPI.js to take in the signal parametar
    BooksAPI.getAll(this.abortController.signal).then(data => {
      // map the response to the book const
      const books = data.map(book => ({
        id: book.id,
        title: book.title,
        authors: book.authors,
        imageURL: book.imageLinks ? book.imageLinks.smallThumbnail : null,
        shelf: book.shelf,
      }));
      // assign the value of book to this.state.books
      this.setState({ books });
    });
  }

  componentWillUnmount() {
    // abort api call if the user navigates from the page before getting the data back
    // prevents setting state on an unmounted component
    this.abortController.abort();
  }

  // handle use actions on books, passed down to ShelfChanger.js component
  bookActionsHandler = (action, selectedBook) => {
    // set the shelf propert of the book to action value
    selectedBook.shelf = action;
    // filter the book out of state.books and save the resault in book const
    const books = this.state.books.filter(book => book.id !== selectedBook.id);
    if (action === 'none') {
      this.setState({ books });
    } else {
      // set the state.books to filtered books and append the selected book with the new shelf value
      this.setState({ books: [...books, selectedBook] });
    }
    // update the book in the database
    BooksAPI.update({ id: selectedBook.id }, action);
  };

  // passed down to ShelfChanger.js to set the select element value prop to book.shelf value
  setValueHandler = id => {
    const value = this.state.books.filter(book => book.id === id);
    return value.map(book => book.shelf);
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MyReads
              books={this.state.books}
              setValueHandler={this.setValueHandler}
              handleBookActions={this.bookActionsHandler}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              setValueHandler={this.setValueHandler}
              handleBookActions={this.bookActionsHandler}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
