import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import './homeStyle.css';
import bookImg from '../../../image/main-book.jpg';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        height: '100%',
        margin: '10px 10px',
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
}));

const HomeContainer = (props) => {
    let history = useHistory();
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                    <Paper className={classes.paper}>
                        <img src={bookImg} alt="book" style={{width: '100%'}}/>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Paper className={classes.paper}>
                        <div className={'intro'}>
                            This demo website was created to practice ReactJS and Express(NodeJS)<br/>
                            Simply, display book list that stored in the database using REST API<br/>
                            You can leave comment on the book detail pages! <br/>
                            Even there's only few books, it could be your favorite. <br/>
                        </div>
                        <Button variant="contained" style={{backgroundColor: '#F1DEB4'}} onClick={() => history.push('/books')}>Let's go Books</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomeContainer;