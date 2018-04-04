import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import store from '../store';

let Task = ((props) => {
  let task = props.task;
  let prop = props.prop;
  let hrs = Math.floor(task.worktime/60);
  if(hrs<10) hrs="0"+hrs;
  let min =task.worktime%60;
  if(min<10) min="0"+min;

  function delete_task(ev) {
    api.delete_task(task.id);
  }
  function update_task_form(ev){
    let action = {
      type: 'UPDATE_EDITTASK_FORM',
      data: task,
    };
    prop.dispatch(action);
    let action1 = {
      type: 'CLEAR_TASK_ERROR',
    };
    prop.dispatch(action1);
  }

  return <tr>
    <td className="width2">{task.title}</td>
    <td className="width3">{task.description}</td>
    <td className="width1">{task.assigned_email}</td>
    <td className="width1">{hrs+":"+min}</td>
    <td className="width2">{task.complete?"Completed":"Not Completed"}</td>
    <td className="width4">
    <div>
      <NavLink className="nav-link inline1" to="/tasks/edit" href="#" onClick={update_task_form}> Edit</NavLink>
      <Button className="btn-xs btn-danger inline1" onClick={delete_task}>Delete</Button>
    </div></td></tr>;
});

function Tasks(props) {
  let tasks = _.map(props.tasks, (pp) => <Task key={pp.id} task={pp} prop={props}/>);
  return <div className="row dcenter">
  <table className="table table-striped">
    <thead>
      <tr>
        <th className="width2">Title</th>
        <th className="width3">Description</th>
        <th className="width1">AssignedTo</th>
        <th className="width1">Worktime(HH:mm)</th>
        <th className="width2">Completed</th>
        <th className="width3"></th>
      </tr>
    </thead>
    <tbody>
      {tasks}
    </tbody>
  </table> </div>;
}

function state2props(state) {
  return {
    token: state.token,
    tasks: state.tasks,
  };
}
export default connect(state2props,null,null,{pure: false})(Tasks);
