defmodule Tasktracker3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string, null: false
      add :description, :text, null: false
      add :worktime, :bigint, default: 0
      add :complete, :boolean, default: false, null: false
      add :assigned_to, references(:users, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:assigned_to])
    create index(:tasks, [:user_id])

  end
end
