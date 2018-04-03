import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import store from '../store';

let User = ((props) => {
  let user = props.user;

  return <tr>
    <td className="width2">{user.name}</td>
    <td className="width3">{user.email}</td></tr>;
});

function Users(props) {
  let users_list = _.map(props.tasks, (pp) => <User key={pp.id} user={pp}/>);
  return <div className="row dcenter">
  <table className="table table-striped">
    <thead>
      <tr>
        <th className="width2">Name</th>
        <th className="width3">Email</th>
      </tr>
    </thead>
    <tbody>
      {users_list}
    </tbody>
  </table> </div>;
}

function state2props(state) {
  return {
    token: state.token,
    tasks: state.users,
  };
}
export default connect(state2props,null,null,{pure: false})(Users);
