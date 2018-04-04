import store from './store';

class TheServer {

  submit_login(data) {
      $.ajax("/api/v1/token", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(data),
        success: (resp) => {
          store.dispatch({
            type: 'SET_TOKEN',
            token: resp,
          });
        },
        error: (resp) => {
          store.dispatch({
            type: 'USER_FORM_ERROR',
            errors: {login: 'Invalid Email Or Password'}
          })
        },
      });
    }

  request_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  delete_task(id) {
    $.ajax("/api/v1/tasks/"+id, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          id: id,
        });
      },
    });
  }

  request_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }


  register_user(data) {
      $.ajax("/api/v1/users", {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify({ user: data }),
        success: (resp) => {
          store.dispatch({
            type: 'ADD_USER',
            user: resp.data,
          });
          store.dispatch({
            type: 'CLEAR_FORM'
          });
          store.dispatch({
            type: 'USER_FORM_ERROR',
            errors: {"success": "User registered successfully!!"},
          });
        },
        error: (resp) => {
          let errors = resp.responseJSON.errors;
          if(data.password==""){
            errors["password"] = ["can't be blank"];
          }
          // else   errors["password"] = "";
          store.dispatch({
            type: 'USER_FORM_ERROR',
            errors: resp.responseJSON.errors,
          });
        },
      });
  }

  create_task(data) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
        store.dispatch({
          type: 'CLEAR_TASK_FORM'
        });
        store.dispatch({
          type: 'TASK_FORM_ERROR',
          errors: {"success": "Task created successfully"},
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'TASK_FORM_ERROR',
          errors: resp.responseJSON.errors,
        });
      },
    });
  }

  update_task(data, id) {
    $.ajax("/api/v1/tasks/"+id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data }),
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          id: id,
        });
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
        store.dispatch({
          type: 'TASK_FORM_ERROR',
          errors: {"success": "Task updated successfully"},
        });
      },
      error: (resp) => {
        store.dispatch({
          type: 'TASK_FORM_ERROR',
          errors: resp.responseJSON.errors,
        });
      },
    });
  }


}

export default new TheServer();
