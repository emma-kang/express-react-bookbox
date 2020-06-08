import React from 'react';
import LogoImg from '../../../image/BookBox.png'
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bgColor: {
        backgroundColor: '#3F4938',
    },
    navItem: {
        color: 'white',
        backgroundColor: '#3F4938'
    },
    navSubItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
    }
}))

const Header = (props) => {
    let history = useHistory();
    const classes = useStyles();

    const clickLogout = () => {
        sessionStorage.removeItem('token');
        history.replace('/');
        window.location.reload();
    }

    return(
        <div>
            {/* Navigation */}
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.bgColor}>
                        <img src={LogoImg} alt="Logo" style={{width: 'auto', height: '80px'}}/>
                        <div className={classes.navSubItem}>
                            <Button className={classes.navItem} onClick={() => history.push('/')}>Home</Button>
                            <Button className={classes.navItem} onClick={() => history.push('/books')}>Books</Button>
                            {(sessionStorage.getItem('token') !== null
                            ? <Button className={classes.navItem} onClick={clickLogout}>Logout</Button>
                            : <Button className={classes.navItem} onClick={() => history.push('/login')}>Login</Button>
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                {/*<Button variant="contained" color="secondary" onClick={() => history.push('/books')}>Let's go Books</Button>*/}
            </div>
        </div>
    )
};

export default Header;