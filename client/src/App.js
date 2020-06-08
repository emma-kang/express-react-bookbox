import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './component/scenes/header/Header';
import Footer from './component/scenes/footer/Footer';
import HomeEntry from './component/scenes/home';
import BookEntry from './component/scenes/books';
import LoginEntry from "./component/scenes/login";
import SignupEntry from './component/scenes/singup';

const App = (props) => {
  return(
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Router>
          <Header />
            <div style={{marginTop: '100px'}}>
                <Switch>
                    <Route exact path='/' component={() => { return(<HomeEntry />); }} />
                    <Route path='/books' component={() => { return(<BookEntry />); }} />
                    <Route path='/login' component={() => { return(<LoginEntry />); }} />
                    <Route path='/signup' component={() => { return(<SignupEntry />); }} />
                </Switch>
            </div>
            <Footer />
        </Router>
    </div>
  )
};

export default App;