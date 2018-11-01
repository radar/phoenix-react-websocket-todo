import * as React from "react"

interface TodoFormProps {
  addTodo: (todo) => void
}

interface TodoFormState {
  todo: string
}

export default class TodoForm extends React.Component<TodoFormProps, TodoFormState> {
  state = {
    todo: ""
  }

  addTodo = (e) => {
    this.props.addTodo(this.state.todo);
    this.setState({todo: ""})
    e.preventDefault()
  }

  setTodo = (e) => {
    this.setState({todo: e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.addTodo}>
        <input type="text" onChange={this.setTodo} value={this.state.todo} />
      </form>
    )
  }
}