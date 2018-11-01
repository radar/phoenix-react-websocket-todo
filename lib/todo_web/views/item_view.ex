defmodule TodoWeb.ItemView do
  use TodoWeb, :view

  def render("show.json", item) do
    item |> Map.take([:id, :name, :done])
  end
end
