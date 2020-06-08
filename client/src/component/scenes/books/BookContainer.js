import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {redux_set_book} from '../../../reducer/ducksReducer';

import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import BookList from './BookList';
import DetailPage from './DetailPage';

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '30px 15px 60px 15px',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  }
}));

const BookContainer = (props) => {
  const [state, setState] = useState(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const classes = useStyle();

  useEffect(() => {
    fetch("http://localhost:8080/api/books")
      .then(res => res.json())
      .then(value =>
        setState(value.data)
      )
      .catch((err) => {
        console.log(err);
      })
  }, []);

  const selectedBook = (selectedBookData) => {
    props.redux_set_book(selectedBookData);
    setShowDetailPage(true);
  };

  const closeDetailPage = () => { setShowDetailPage(false); }

  return (
    <div className={classes.root}>
      {(showDetailPage)
        ?
        <DetailPage data={props.redux_bookData} closeDetailPage={closeDetailPage}/>
        :
        null
      }
      <h1 className={classes.title}>Book List</h1>
      <Grid container spacing={1}>
        {state != null
          ?
          state.map((el, key) => {
            return (
              <Grid item key={key} xs={12} sm={3}>
                <Paper>
                  <BookList data={el} selectedBook={selectedBook}/>
                </Paper>
              </Grid>
            )
          })
          :
          null
        }
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  redux_bookData: state.ducksReducer.bookData
});

const mapDispatchToProps = (dispatch) => {
  return {
    redux_set_book: (bookData) => dispatch(redux_set_book(bookData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookContainer);
