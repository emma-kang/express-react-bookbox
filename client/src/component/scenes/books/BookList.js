import React from 'react';
import './booksStyle.css';

const BookList = ({ data }) => {
    return (
        <div className="book-list">
            <img src={data.imageurl} alt="book"/>
            <h3 className="book-list-title">{data.title}</h3>
            <div className="book-list-info">
                <p><span className="book-list-info-title">Category: </span>{data.category}</p>
                <p><span className="book-list-info-title">Publisher: </span>{data.publisher}</p>
                <p><span className="book-list-info-title">Published: </span>{data.published.split('T')[0]}</p>
            </div>
        </div>
    )
}

export default BookList;