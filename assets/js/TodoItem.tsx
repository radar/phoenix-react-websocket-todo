import * as React from "react"
import socket from "./socket"

interface TodoItemProps {
  toggleTodo: (id) => void,

  id: number,
  name: string,
  done: boolean,
}

interface TodoItemState {
  id: number,
  name: string,
  done: boolean,
  channel: null,
}

export default class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  // TODO: Is there a better way to write this?
  state = {
    id: this.props.id,
    name: this.props.name,
    done: this.props.done,
    channel: null,
  }

  componentDidMount() {
    let channel = socket.channel(`item:${this.props.id}`)
    channel.join()
      .receive("ok", resp => { this.setState(resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })

    channel.on("toggle", ({done}) => { this.toggled(done) })

    this.setState({channel: channel})
  }

  toggled = (done) => {
    this.setState({done: done})
  }

  toggle = () => {
    this.state.channel.push("toggle", { id: this.props.id })
  }

  render() {
    const {name} = this.props
    return (
      <div>
        <input
          type='checkbox'
          defaultChecked={this.state.done}
          checked={this.state.done}
          onChange={this.toggle} />
        {name}
      </div>
    )
  }
}