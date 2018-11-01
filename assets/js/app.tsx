// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import * as css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"
import * as React from "react"
import * as ReactDOM from "react-dom"

import TodoForm from "./TodoForm"
import List from "./TodoList"

class App extends React.Component {
  render() {
    return (
      <div>
        <List />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
