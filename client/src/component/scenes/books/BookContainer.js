import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const BookContainer = (props) => {
    const [state, setState] = useState(null);

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

    console.log(state);

    let history = useHistory();

    return(
        <div>
            <h3>BookContainer !!</h3>
            <Button variant="contained" color="secondary" onClick={() => history.push('/')}>Let's go Home</Button>
        </div>
    )
}

export default BookContainer;