defmodule TodoWeb.ListChannel do
  use Phoenix.Channel
  alias Todo.Lists

  def join("list:main", _message, socket) do
    todos = Lists.list_items
    |> Enum.map(fn (item) ->
      item |> Map.take([:id, :name, :done])
    end)
    {:ok, %{todos: todos}, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("addTodo", %{"name" => name}, socket) do
    {:ok, item} = Lists.create_item(%{name: name})
    reply = item |> Map.take([:id, :name, :done])
    broadcast! socket, "todoAdded", reply
    {:noreply, socket}
  end
end
