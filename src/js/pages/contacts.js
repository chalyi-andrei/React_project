import React, { Component } from 'react';

import FormSerialize from 'form-serialize';
import axios from 'axios';

class Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
        nameField: '',
        emailField: '',
        textField: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post('/', {
      data: JSON.stringify(this.state)
    });
    this.resetForm();

  }
  resetForm() {
    this.setState({
        nameField: '',
        emailField: '',
        textField: '',
    });
  }

  handleChange = (filter, value) => {
    this.setState({ [filter]: value });
    console.log(value);
  }

  render() {
    return (
      <div className="g-section">
        <div className='contacts'>
          <div className='contacts__caption'>
            <h4 className='contacts__title'>
              <img src='http://www.freeiconspng.com/uploads/communication-email-2-icon-7.png' className='contacts__img'/>
              Contact us and we will contact you
              <span className='contacts__notice'>
                Be sure to include your email
              </span>
            </h4>
          </div>
          <form action="#" onSubmit={(event) =>this.handleSubmit(event)}>
            <input
              onChange={(event) => this.handleChange('nameField', event.target.value)}
              value={this.state.nameField}
              type="text"
              className='contacts__input'
              placeholder='Name'/>

            <input
              onChange={(event) => this.handleChange('emailField', event.target.value)}
              type="text"
              value={this.state.emailField}
              className='contacts__input'
              placeholder='Email'/>

            <textarea
              onChange={(event) => this.handleChange('textField', event.target.value)}
              name="descr" id="" cols="30" rows="10"
              value={this.state.textField}
              className='contacts__textarea'
              placeholder='text'>
            </textarea>

            <button className='contacts__btn'> Отсправить</button>
          </form>
        </div>
      </div>
    );
  }

}

export default Contacts;
