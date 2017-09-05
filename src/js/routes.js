import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Contacts from './pages/contacts';
import Main from './pages/main';
import Images from './pages/images';
import NotFound from './pages/notFound';
import Menu from './elements/menu/menu';

class Router extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <BrowserRouter>
            <div>
                <Menu/>
                <Switch>
                  <Route exact path='/' component={Main}/>
                  <Route path='/contacts' component={Contacts}/>
                  <Route path='/images' component={Images}/>
                  <Route component={NotFound}/>
                </Switch>
            </div>
          </BrowserRouter>
        );
    }
}

export default Router;
