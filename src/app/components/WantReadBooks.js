import React, { Component } from 'react'
import { getAll } from './../utils/BooksAPI'

class WantToRead extends Component {
  state = {
    booksWant: []
  }

  async consultingListBooks() {
    await getAll()
      .then(list => this.setState(() => ({ booksWant: list.filter(book => book.shelf === 'wantToRead') })))
      .catch(err => console.warn(`Error on fetching list books from API. ERROR: ${err}`))
  }

  async componentDidMount() {
    this.consultingListBooks()
  }

  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.state.booksWant.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">1776</div>
                <div className="book-authors">David McCullough</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default WantToRead