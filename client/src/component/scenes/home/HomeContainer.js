import React from 'react';
import {useHistory} from "react-router-dom";
import './homeStyle.css';
import bookImg from '../../../image/main-book.jpg';
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import ButtonComp from '../reusuable/buttonComp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '80px 15px',
  },
}));

const HomeContainer = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const onClickBtn = () => {
    history.push('/books');
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <img src={bookImg} alt="book" style={{width: '100%'}}/>
        </Grid>
        <Grid item sm={12} md={6}>
          <div className={'intro'}>
            This demo website was created to practice ReactJS and Express(NodeJS)<br/>
            Simply, display book list that stored in the database using REST API<br/>
            You can leave comment on the book detail pages! <br/>
            Even there's only few books, it could be your favorite. <br/>
          </div>
          <ButtonComp
            activeBtn={true}
            onClickBtn={onClickBtn}
            text="Go to book List"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default HomeContainer;