import * as React from 'react'
import socket from "./socket"

import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"

export default class List extends React.Component {
  state = {
    channel: null,
    todos: []
  }

  componentDidMount() {
    let channel = socket.channel("list:main")
    channel.join()
      .receive("ok", resp => { this.setTodos(resp.todos) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    channel.on("todoAdded", todo => { this.todoAdded(todo) })

    this.setState({channel: channel})
  }

  setTodos = (todos) => {
    this.setState({todos: todos})
  }

  todoAdded = (todo) => {
    let todos = this.state.todos;
    todos.unshift(todo)
    this.setState({todos: todos})
  }

  addTodo = (todo) => {
    this.state.channel.push("addTodo", { name: todo })
      .receive("ok", todo => { this.todoAdded(todo) })
  }

  render() {
    return (
      <div>
        <TodoForm addTodo={this.addTodo} />
        {this.renderTodos()}
      </div>
    )
  }

  renderTodos() {
    return this.state.todos.map((todo) => {
      return <TodoItem {...todo} key={todo.id} />
    })
  }
}