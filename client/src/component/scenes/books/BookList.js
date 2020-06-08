import React from 'react';
import './booksStyle.css';
import ButtonComp from '../reusuable/buttonComp';

const BookList = ({data, selectedBook}) => {
  const onClickBtn = () => {
    selectedBook(data);
  }
  return (
    <div className="book-list">
      <img src={data.imageurl} alt="book"/>
      <h3 className="book-list-title">{data.title}</h3>
      <div className="book-list-info">
        <p><span className="book-list-info-title">Author: </span>{data.author}</p>
      </div>
      <div className="book-list-btn">
        <ButtonComp
          activeBtn={true}
          onClickBtn={onClickBtn}
          text="See Details"
        />
      </div>
    </div>
  )
}

export default BookList;