import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import Contacts from './pages/contacts';
import Main from './pages/main';
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
                  <Route exact path='/' component={Main}/>
                  <Route path='/contacts' component={Contacts}/>
              </div>
          </BrowserRouter>
        );
    }
}

export default Router;
