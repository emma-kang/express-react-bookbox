import React from 'react';
import Button from "@material-ui/core/Button";
import './booksStyle.css';

const BookList = ({data, selectedBook}) => {
  return (
    <div className="book-list">
      <img src={data.imageurl} alt="book"/>
      <h3 className="book-list-title">{data.title}</h3>
      <div className="book-list-info">
        <p><span className="book-list-info-title">Author: </span>{data.author}</p>
        <Button variant="contained" style={{backgroundColor: '#F1DEB4'}} onClick={() => selectedBook(data)}>See
          Details</Button>
      </div>
    </div>
  )
}

export default BookList;