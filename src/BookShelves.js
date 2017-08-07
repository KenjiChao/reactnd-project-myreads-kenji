import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookItem from './BookItem';

/**
 * Component for Main Page
 */
class BookShelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChanged: PropTypes.func.isRequired,
  };

  render() {
    const { books } = this.props;
    const { onBookShelfChanged } = this.props;

    // Filter books for different shelves.
    let currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    let wantToRead = books.filter(book => book.shelf === 'wantToRead');
    let read = books.filter(book => book.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map((book) => (
                    <BookItem
                      key={book.id}
                      book={book}
                      onBookShelfChanged={onBookShelfChanged}/>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map((book) => (
                    <BookItem
                      key={book.id}
                      book={book}
                      onBookShelfChanged={onBookShelfChanged}/>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map((book) => (
                    <BookItem
                      key={book.id}
                      book={book}
                      onBookShelfChanged={onBookShelfChanged}/>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelves;
