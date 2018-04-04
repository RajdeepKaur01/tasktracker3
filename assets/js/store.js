import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  state layout:
 *  {
 *   tasks: [... Tasks ...],
 *   users: [... Users ...],
 *   errors: [... Errors ...],
 *   user_form: {
 *     email: "",
 *     name: "",
 *   }
 * }
 *
 * */

function tasks(state = [], action) {
  switch (action.type) {
 case 'TASKS_LIST':
   return [...action.tasks];
 case 'ADD_TASK':
   return [action.task, ...state];
  case 'DELETE_TASK':
    return state.filter(task => task.id != action.id);
    // { state: [...state.slice(0, parseInt(action.id)), ...state.slice(parseInt(action.id) + 1)]};
 default:
   return state;
 }
}

function users(state = [], action) {
  switch (action.type) {
 case 'USERS_LIST':
   return [...action.users];
 case 'ADD_USER':
   return [action.user, ...state];
 default:
   return state;
 }
}

let empty_user_form = {
  email: "",
  name: "",
  password: "",
  password_confirmation: ""
};

function form(state = empty_user_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_user_form;
    default:
      return state;
  }
}

let default_user_errors = {
  email: [""],
  name: [""],
  password: [""],
  password_hash:[""],
  password_confirmation: [""],
  login: "",
  success: "",
};

function user_errors(state = default_user_errors, action) {
  switch (action.type) {
   case 'USER_FORM_ERROR':
      return Object.assign({}, default_user_errors, action.errors);
  case 'CLEAR_USER_ERROR':
    return default_user_errors;
   default:
     return state;
 }
}

//Password Login auth
function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'REMOVE_TOKEN':
      return null;
    default:
      return state;
  }
}

// Login Form
let empty_login = {
  email: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_LOGIN':
      return empty_login;
    default:
      return state;
  }
}

// Task Form
let empty_task = {
  user_id: "",
  title: "",
  description: "",
  assigned_to: "",
  worktime: 0,
  complete: false,
};

function taskform(state = empty_task, action) {
  switch (action.type) {
    case 'UPDATE_TASK_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_TASK_FORM':
      return empty_task;
    default:
      return state;
  }
}

function edittaskform(state = empty_task, action) {
  switch (action.type) {
    case 'UPDATE_EDITTASK_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}
// TASK FORM Errors
let default_task_errors = {
  user_id: "",
  title: "",
  description: "",
  assigned_to: "",
  worktime: "",
  complete: "",
  success: "",
};

function task_errors(state = default_task_errors, action) {
  switch (action.type) {
    case 'TASK_FORM_ERROR':
      return Object.assign({}, default_task_errors, action.errors);
    case 'CLEAR_TASK_ERROR':
      return default_task_errors;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  // console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, user_errors, token, login, taskform, task_errors, edittaskform});
  let state1 = reducer(state0, action);
  // console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
