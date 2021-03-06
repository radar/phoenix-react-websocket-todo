defmodule Todo.Lists.Item do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :done]}

  schema "items" do
    field :name, :string
    field :done, :boolean

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:name, :done])
    |> validate_required([:name])
  end
end
