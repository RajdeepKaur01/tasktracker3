import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function NewTask(params) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    data["user_id"] = params.token.user_id;
    let action = {
      type: 'UPDATE_TASK_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function update_check(ev) {
    let toggle = !params.form.complete;
    let data = {};
      data["complete"] = toggle;
      let action = {
        type: 'UPDATE_TASK_FORM',
        data: data,
      };
      params.dispatch(action);
    }

    function cleardata() {
      let action = {
        type: 'CLEAR_TASK_FORM',
      };
      params.dispatch(action);
      let action1 = {
        type: 'CLEAR_TASK_ERROR',
      };
      params.dispatch(action1);
    }

  function submit(ev) {
    api.create_task(params.form);
  }
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.email}</option>);
  return <div style={ {padding: "4ex"} }>
    <h2>New Task</h2>
    <span className="success-msg">{params.errors.success}</span>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="text" className="form-control" name="title" value={params.form.title} onChange={update}/>
      <span>{params.errors.title}</span>
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" className="form-control" name="description" value={params.form.description} onChange={update}/>
      <span>{params.errors.description}</span>
    </FormGroup>
    <FormGroup>
      <Label for="assigned_to">Assigned To</Label>
    <Input type="select" name="assigned_to" value={params.form.assigned_to} onChange={update}>
      <option>Select</option>
      {users}
    </Input>
    <span>{params.errors.assigned_to}</span>
    </FormGroup>
    <FormGroup>
      <Label for="worktime">Time Worked(in Minutes)</Label>
      <Input type="number" step="15" min="0" className="form-control" name="worktime" value={params.form.worktime} onChange={update}/>
      <span>{params.errors.worktime}</span>
    </FormGroup>
    <FormGroup>
      <Label for="complete" className="label1 inline1">Completed</Label>
      <Input type="checkbox" className="inline1" name="complete" checked={params.form.complete} value={params.form.complete} onChange={update_check}/>
    </FormGroup>
    <Button className="btn btn-primary" color="btn-primary" onClick={submit}>Submit</Button>
    <Button className="btn btn-primary" onClick={cleardata}>Clear</Button> </div>;
}

function state2props(state) {
  return {
    form: state.taskform,
    errors: state.task_errors,
    token: state.token,
    users: state.users,
  };
}

// Export the result of a curried function call.
export default connect(state2props)(NewTask);
