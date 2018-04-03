import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

function LoginForm(props) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="row dcenter">
    <div className="col-lg-4"/>
    <div className="col-lg-4">
    <Form>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" placeholder="abc@example.com"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
      <Label for="pass">Password</Label>
        <Input type="password" name="pass"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <span className="span-padding">{props.user_errors.login}</span><br/>
      <Button onClick={create_token} color="btn-primary" className="btn btn-primary">Log In</Button>
    </Form>
    </div>
    <div className="col-lg-4"/> </div>
}

function state2props(state) {
  return {
    token: state.token,
    login: state.login,
    user_errors: state.user_errors,
  };
}

export default connect(state2props)(LoginForm);
