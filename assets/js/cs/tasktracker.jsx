import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import Register from './register';
import LoginForm from './login';
import Nav from './nav';
import Tasks from './tasks';
import NewTask from './newtask';
import EditTask from './edittask';
import Users from './users';

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasktracker />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasktracker = connect((state) => state)((props) => {
  let logged_in = props.token;
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact={true} render={() =>
            logged_in? <Tasks tasks={props.tasks}/> : <p>Welcome!!<br/> Login to view tasks</p>
          } />
          <Route path="/tasks" exact={true} render={() =>
            logged_in? <Tasks tasks={props.tasks}/> : <p>Welcome!!<br/> Login to view tasks</p>
          } />
          <Route path="/register" exact={true} render={() =>
            <Register />
          } />
          <Route path="/login" exact={true} render={() =>
            logged_in? (<Redirect to="/" />) : (<LoginForm />)
          } />
          <Route path="/tasks/new" exact={true} render={() =>
            logged_in? (<NewTask />) : (<Redirect to="/" />)
          } />
          <Route path="/tasks/edit" exact={true} render={() =>
            <EditTask />
          } />
          <Route path="/users" exact={true} render={() =>
            logged_in? (<Users />) : (<Redirect to="/" />)
          } />

        </div>
      </Router>
    );
  });
