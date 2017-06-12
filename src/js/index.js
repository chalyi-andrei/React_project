import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Router from './routes';


class App extends Component {

  constructor(props) {
    super(props);
  }

  handleClick(e) {
      e.preventDefault();
  }

  render() {
    return (
        <div></div>
    );
  }

}

ReactDOM.render(
    <Router/>,
    document.getElementById('app'),
);
