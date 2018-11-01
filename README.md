# Todo: Phoenix + React + Websocket Demo

This is a small Phoenix application which demonstrates how to use Phoenix Channels, React and Web Sockets to build a simple todo list application.

You can run this by first installing Elixir, and then:

```
mix deps.get
mix do ecto.create, ecto.migrate
mix phoenix.server
```

At http://localhost:4000, you should see the todo list. If you open the same list in another browser, you'll notice that changes on one browser are automatically sent to the other browser.