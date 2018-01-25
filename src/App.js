import React, { Component } from 'react';
import './App.css';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  formRow: {
    display: 'inline'
  },

  errorMsg:{
    color: 'red'

  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      emailInput: '',
      nameErrorMsg: '',
      emailErrorMsg: '',
      validForm: true,
      formSubmitted: false
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  
  handleNameChange(event) {
    //console.log(event.target.value);
    if (this.validateName(event.target.value)){
      this.setState({nameInput: event.target.value, nameErrorMsg: ''}, this.validateForm)
    } else {
      this.setState({nameInput: '', nameErrorMsg: 'You have entered an invalid name.'}, this.validateForm)
    }
  }

  handleEmailChange(event) {
    //console.log(event.target.value);
    if (this.validateEmail(event.target.value) || event.target.value === ''){
      this.setState({emailInput: event.target.value, emailErrorMsg: ''}, this.validateForm)
    } else {
      this.setState({emailInput: '', emailErrorMsg: 'You have entered an invalid email.'}, this.validateForm)
    }
  }

  validateName(str){
    return /^[A-z -]*$/.exec(str);
  }

  validateEmail(str){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.exec(str);
  }

  validateForm() {
    let disableForm = true;
    if (this.state.nameInput &&
            this.state.emailInput &&
            !this.state.nameErrorMsg &&
            !this.setState.emailErrorMsg) {
              disableForm = false;
            }
    //console.log("Valid form "+ disableForm);
    this.setState({validForm: disableForm})
  }

  formSubmit(event){
    event.preventDefault();
    this.setState({formSubmitted: true})
  }
  
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Validated Form</h1>
        {this.state.formSubmitted &&
          <h2> Success! </h2>
        }
        {!this.state.formSubmitted &&
        <form onSubmit={this.formSubmit} style={styles.form}>
          <div className="form-row">
          <input name="nameInput"
              onChange={this.handleNameChange}
              type="text"/><span style={styles.errorMsg}>{this.state.nameErrorMsg}</span>
          </div>
          <div className="form-row"> 
          <input name="emailInput"
              onChange={this.handleEmailChange}
              type="email" /><span style={styles.errorMsg}>{this.state.emailErrorMsg}</span>
          </div>
           
            <button disabled={this.state.validForm} >Submit</button>
        </form>
        }
      </div>
    );
  }
}

export default App;
