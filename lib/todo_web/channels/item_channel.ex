defmodule TodoWeb.ItemChannel do
  use Phoenix.Channel
  alias Todo.Lists

  def join("item:" <> item_id, _message, socket) do
    item = item_id |> Lists.get_item! |> Map.take([:id, :name, :done])
    {:ok, item, socket}
  end

  def handle_in("toggle", %{"id" => id}, socket) do
    {:ok, item} = Lists.toggle_item_done(id)
    broadcast! socket, "toggle", %{done: item.done}
    {:noreply, socket}
  end
end
