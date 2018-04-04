import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let Session = connect(({token}) => {return {token};})((props) => {
  function remove_token(){
    let action = {
      type: 'REMOVE_TOKEN'
    };
    props.prop.dispatch(action);
  }

  return <div>
    <span className="links p-white inline1">Logged in as { props.token.user_name } | </span>
    <NavLink to="/" href="#" className="nav-link links inline1" onClick={remove_token}>Logout</NavLink> </div>;
});

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} prop={props} />;
  }
  else {
    // session_info = <LoginForm />
    session_info =
    <div>
    <ul className="navbar-nav mr-auto">
      <NavItem>
        <NavLink to="/login" href="#" className="nav-link links" onClick={clearuserdata}>Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/register" href="#" className="nav-link links" onClick={clearuserdata}>New User?</NavLink>
      </NavItem>
      </ul></div>;
  }
  function clearuserdata() {
    let action = {
      type: 'CLEAR_FORM',
    };
    props.dispatch(action);
    let action1 = {
      type: 'CLEAR_USER_ERROR',
    };
    props.dispatch(action1);
    let action2 = {
      type: 'CLEAR_LOGIN',
    };
    props.dispatch(action2);
  }

  function cleardata() {
    let action = {
      type: 'CLEAR_TASK_ERROR',
    };
    props.dispatch(action);
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand head1">
        Tasktracker-3
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link links">Tasks</NavLink>
        </NavItem>
        <NavItem>
          {props.token? <NavLink to="/tasks/new" className="nav-link links" onClick={cleardata}>New Task</NavLink> : ""}
        </NavItem>
        <NavItem>
          {props.token? <NavLink to="/users" className="nav-link links">Users</NavLink> : ""}
        </NavItem>
      </ul>
      { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token
  };
}

export default connect(state2props,null,null,{pure: false})(Nav);
