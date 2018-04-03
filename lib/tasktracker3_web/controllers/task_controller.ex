defmodule Tasktracker3Web.TaskController do
  use Tasktracker3Web, :controller

  alias Tasktracker3.Tasks
  alias Tasktracker3.Tasks.Task

  action_fallback Tasktracker3Web.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      IO.inspect(Tasks.get_task!(task.id).assigned_user.email )
      conn
      |> put_status(:created)
      |> put_resp_header("location", task_path(conn, :show, task))
      |> render("show.json", task: Tasks.get_task!(task.id))
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: Tasks.get_task!(task.id))
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end

  # def create(conn, %{"task" => task_params, "token" => token}) do
  #   {:ok, user_id} = Phoenix.Token.verify(conn, "auth token", token, max_age: 86400)
  #   if task_params["user_id"] != user_id do
  #     IO.inspect({:bad_match, task_params["user_id"], user_id})
  #     raise "hax!"
  #   end
  # end

end