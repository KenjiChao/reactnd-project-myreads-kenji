import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';
import PropTypes from 'prop-types';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChanged: PropTypes.func.isRequired,
  };

  state = {
    query: '',
    results: [],
  };

  changeBookShelf = (event, book) => {
    book.shelf = event.target.value;
    this.setState({ results: this.state.results });
    this.props.onBookShelfChanged(event, book);
  };

  updateQuery = (query) => {
    this.setState({ query: query });
    // Only send server request when query string is not empty
    if (query) {
      BooksAPI.search(query, 100).then((results) => {
        // Make sure the result is an array.
        if (results && results.length) {
          // Shelf information from server is not correct, so we override the information with books in the shelves.
          results.forEach(book => {
            const index = this.props.books.findIndex((element) => element.id === book.id);
            if (index !== -1) {
              book.shelf = this.props.books[index].shelf;
            } else {
              book.shelf = 'none';
            }
          });

          this.setState({ results: results });
        } else {
          this.setState({ results: [] });
        }
      });
    } else {
      this.setState({ results: [] });
    }
  };

  render() {
    const { query, results } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onBookShelfChanged={this.changeBookShelf}/>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
