import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Menu extends Component {

  constructor(props) {
    super(props);
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
      return (
        <div className="menu-outer">
          <ul className="menu">
            <li className="menu__item">
              <Link className="menu__link" to='/'>Main</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to='/contacts'>Contacts</Link>
            </li>
            <li className="menu__item">
              <Link className="menu__link" to='/images'>Images</Link>
            </li>
          </ul>
        </div>
      );
  }
}

export default Menu;
