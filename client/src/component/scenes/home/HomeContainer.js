import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import './homeStyle.css';

const HomeContainer = (props) => {

    let history = useHistory();

    return(
        <div className={'homeContainer'}>
            <h3>HomeContainer !!</h3>
            <Button variant="contained" color="secondary" onClick={() => history.push('/books')}>Let's go Books</Button>
        </div>
    )
}

export default HomeContainer;