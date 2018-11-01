defmodule TodoWeb.ItemChannel do
  use Phoenix.Channel
  alias Todo.Lists

  def join("item:" <> item_id, _message, socket) do
    item = Lists.get_item!(item_id)
    Phoenix.View.render(TodoWeb.ItemView, "show.json", item)
    {:ok, item, socket}
  end

  def handle_in("toggle", %{"id" => id}, socket) do
    {:ok, item} = Lists.toggle_item_done(id)
    broadcast! socket, "toggle", %{done: item.done}
    {:noreply, socket}
  end
end
