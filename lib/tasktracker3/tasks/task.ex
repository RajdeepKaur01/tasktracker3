defmodule Tasktracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :complete, :boolean, default: false
    field :description, :string
    field :title, :string
    field :worktime, :integer, default: 0
    belongs_to :user, Tasktracker3.Users.User, foreign_key: :user_id
    belongs_to :assigned_user, Tasktracker3.Users.User, foreign_key: :assigned_to

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:user_id, :title, :description, :assigned_to, :worktime, :complete])
    |> validate_worktime(:worktime)
    |> validate_required([:user_id,:title, :description, :worktime, :complete])
    |> validate_required(:assigned_to, [message: "Select one"])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:assigned_to)
  end

  def validate_worktime(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, worktime ->
     case valid_time?(worktime) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end

  def valid_time?(worktime) when worktime>0 and rem(worktime,15) == 0 do
    {:ok, worktime}
  end
  def valid_time?(_), do: {:error, "Time worked should be multiple of 15 and >0"}

end
