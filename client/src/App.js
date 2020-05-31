import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './component/scenes/header/Header';
import Footer from './component/scenes/footer/Footer';
import HomeEntry from './component/scenes/home';
import BookEntry from './component/scenes/books';

const App = (props) => {
  return(
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <Header />
        <Router>
            <div style={{marginTop: '60px', height: 'calc(100vh - 120px)'}}>
                <Switch>
                    <Route exact path='/' component={() => { return(<HomeEntry />); }} />
                    <Route path='/books' component={() => { return(<BookEntry />); }} />
                </Switch>
            </div>
        </Router>
        <Footer />
    </div>
  )
};

export default App;