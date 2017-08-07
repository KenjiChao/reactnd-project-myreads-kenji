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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves
            books={this.state.books}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <Search/>
        )}/>
      </div>
    );
  }
}

export default BooksApp;
