import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import BookShelves from './BookShelves';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

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
          <BookShelves
            books={this.state.books}
            onBookShelfChanged={this.changeBookShelf}
          />
        )}/>
        <Route exact path="/search" render={() => (
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
