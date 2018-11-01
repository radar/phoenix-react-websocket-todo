import * as React from "react"
import socket from "./socket"
import * as css from "../css/item.css"

interface TodoItemProps {
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
    const {name, id} = this.props
    const elementID = `todo_${id}`
    return (
      <div className={css.todo}>
        <label htmlFor={elementID}>
          <input
            id={elementID}
            type='checkbox'
            checked={this.state.done}
            onChange={this.toggle} />
          {name}
        </label>
      </div>
    )
  }
}