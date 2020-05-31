import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

const BookContainer = (props) => {

    let history = useHistory();

    return(
        <div>
            <h3>BookContainer !!</h3>
            <Button variant="contained" color="secondary" onClick={() => history.push('/')}>Let's go Home</Button>
        </div>
    )
}

export default BookContainer;