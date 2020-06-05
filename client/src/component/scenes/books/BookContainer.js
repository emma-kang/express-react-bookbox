import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '60px 15px 60px 15px',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left'
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px'
    }
}));

const BookContainer = (props) => {
    const [state, setState] = useState(null);
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
    }, [])

    return(
        <div className={classes.root}>
            <h1 className={classes.title}>Book List</h1>
            <Grid container spacing={1}>
                {state != null
                    ?
                    state.map((el, key) => {
                        return (
                                <Grid item key={key} xs={12} sm={3}>
                                    <Paper>
                                        <BookList data={el} />
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

export default BookContainer;