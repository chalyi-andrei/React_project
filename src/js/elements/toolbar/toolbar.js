import React, { Component } from 'react';

class Toolbar extends Component {

  constructor(props) {
    super(props);
      this.state = {
      }
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.props.handleClick(e)}>Search</button>
      </div>
    );
  }

}


export default Toolbar;
