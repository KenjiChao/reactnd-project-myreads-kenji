import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import BookShelves from './BookShelves';
import Search from './Search';

/**
 * Root component of my reads app
 */
class BooksApp extends React.Component {
  state = {
    books: [],
  };

  // After component is mount, fetch books from server and update the state.
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  /**
   * Change the shelf of a given book, and also update on the remote server.
   * @param event onChange event when a book is moved between shelves
   * @param book book object to update
   */
  changeBookShelf = (event, book) => {
    book.shelf = event.target.value;
    this.setState(state => ({
      books: state.books.filter((b) => b.id !== book.id).concat([book]),
    }));

    BooksAPI.update(book, book.shelf);
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          // Main Page
          <BookShelves
            books={this.state.books}
            onBookShelfChanged={this.changeBookShelf}
          />
        )}/>

        <Route exact path="/search" render={() => (
          // Search Page
          <Search
            books={this.state.books}
            onBookShelfChanged={this.changeBookShelf}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;
