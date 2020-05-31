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
    },
    logo: {
        width: '80px',
        height: '80px'
    }
}))

const Header = (props) => {
    let history = useHistory();
    return(
        <div style={{position: 'fixed', width: '100%', display: 'flex', padding: '0 50px', alignItems: 'center', justifyContent: 'space-between', height: '100px'}}>
            {/* LOGO */}
            <div>
                <img src={LogoImg} alt="Logo" style={{width: '80px', height:'80px'}}/>
            </div>

            {/* Navigation */}
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Button variant="contained" color="inherit" onClick={() => history.push('/')}>Home</Button>
                        <Button variant="contained" color="inherit" onClick={() => history.push('/books')}>Books</Button>
                        <Button variant="contained" color="inherit" onClick={() => history.push('/login')}>Login</Button>
                    </Toolbar>
                </AppBar>
                {/*<Button variant="contained" color="secondary" onClick={() => history.push('/books')}>Let's go Books</Button>*/}
            </div>
        </div>
    )
};

export default Header;