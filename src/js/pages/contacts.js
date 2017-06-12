import React, { Component } from 'react';

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
      localStorage.setItem('textItem',JSON.stringify(this.state));
        this.resetForm();
  }
  resetForm() {
      this.setState({
          nameField: '',
          emailField: '',
          textField: '',
      })
  }

  handleChange = (filter, value) => { console.log(value); this.setState({ [filter]: value }) }

  render() {
    return (
      <div className="g-section">
          <form action="#" onSubmit={(event) =>this.handleSubmit(event)}>
              <label htmlFor="">name</label><br/>
              <input onChange={ (event) => this.handleChange('nameField', event.target.value)}
                     type="text"
                     value={this.state.nameField} /> <br/>
              <label htmlFor="">e-mail</label> <br/>
              <input onChange={ (event) => this.handleChange('emailField', event.target.value)}
                     type="text"
                     value={this.state.emailField} /> <br/>
              <label htmlFor="">Text</label> <br/>
              <textarea onChange={ (event) => this.handleChange('textField', event.target.value)}
                name="descr" id="" cols="30" rows="10"
                value={this.state.textField} >
              </textarea> <br/>
              <button> Отсправить</button>
          </form>
      </div>
    );
  }

}

export default Contacts;
