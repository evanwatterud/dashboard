import React from 'react'

import TodoForm from './TodoForm'

import { db, firebase } from '../firebase'

class TodoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { error: null, todoItems: [] }
  }

  componentDidMount() {
    db.getUserTodos(firebase.auth.currentUser.uid)
      .then((snapshot) => {
        const items = Object.values(snapshot.val()).map(itemObject => itemObject.item)

        this.setState({ todoItems: items })
      })
      .catch((err) => {
        this.setState({ error: err })
      })
  }

  onFormSubmit = (event, todoItem) => {
    db.doCreateTodo(firebase.auth.currentUser.uid, todoItem)
      .then(() => {
        const { todoItems } = this.state
        this.setState({ todoItems: [todoItem, ...todoItems] })
      })
      .catch((err) => {
        this.setState({ error: err })
      })

    event.preventDefault()
  }

  render() {
    const { error, todoItems } = this.state
    const todos = todoItems.map(item => <li>{item}</li>)

    return (
      <div>
        <h2>Todo List</h2>
        <ul>
          {todos}
        </ul>
        <TodoForm onSubmit={this.onFormSubmit} error={error} />
      </div>
    )
  }
}

export default TodoList
