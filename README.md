# Tasktracker3 - React SPA
 Design Choices:
  * In case of any error, Login Page will display same error message "Invalid Email or Password". Register, New Task Page and Edit Task Page  will show error message separately for each field.
  * In case of success, user will see a success message on Register, New Task and Edit Task Page. But he will not be redirected to any other page . He can use Nav Bar link to navigate.
  * User will not see New Task and Users Link until he login.
  * User will see Tasks only when he login successfully otherwise will see message to login.
  * Since User name can be same , AssignedTo Dropdown for tasks will refer to unique email of all users. Email has unique constraint.
  * Edit Task Link is not present in Nav Bar. User can go to edit task page from tasks page only. He can click cancel button to go back to tasks page or click on any link in Nav bar. After submit button on task page is clicked , user stay on the same page , so he can modify task further or can click cancel and go back.
  * Users page will list name and email of all the existing users (static page).
  * If user enter negative value or number that is not multiple of 15 manually in WorkTime field in Task , he will get error message. If he enters anything other than number, the task will be created with worktime set to 0.
  * User will see name of user who created the task on task Edit Page.

Users of app will be able to:

Register an account
Log in / Log out
Create Tasks, entering a title and a description
Assign tasks to themselves or other users
Track how long they've worked on a task they're assigned to, in 15-minute increments.
Mark a task as completed.

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
