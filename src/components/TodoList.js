import React from 'react'
import PropTypes from 'prop-types'

import TodoForm from './TodoForm'

import { db, firebase } from '../firebase'

class TodoList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { error: null, todoItems: [] }
  }

  componentDidMount() {
    // Retrieve the current users todo items, if there are none, do nothing
    db.getUserTodos(firebase.auth.currentUser.uid)
      .then((snapshot) => {
        if (snapshot.val()) {
          const items = Object.keys(snapshot.val()).map(key => ({ key, item: snapshot.val()[key].item }))

          this.setState({ todoItems: items })
        }
      })
      .catch((err) => {
        this.setState({ error: err })
      })
  }

  onFormSubmit = (event, todoItem) => {
    db.doCreateTodo(firebase.auth.currentUser.uid, todoItem)
      .then((snapshot) => {
        const { todoItems } = this.state
        const { key } = snapshot
        this.setState({ todoItems: [...todoItems, { key, item: todoItem }] })
      })
      .catch((err) => {
        this.setState({ error: err })
      })

    event.preventDefault()
  }

  removeTodo = (key) => {
    db.doRemoveTodo(firebase.auth.currentUser.uid, key)
      .then(() => {
        const { todoItems } = this.state
        const items = todoItems.filter(item => item.key !== key)
        this.setState({ todoItems: items })
      })
      .catch((err) => {
        this.setState({ error: err })
      })
  }

  render() {
    const { error, todoItems } = this.state
    const todos = todoItems.map(todo => <li key={todo.key}><Todo item={todo.item} id={todo.key} removeTodo={this.removeTodo} /></li>)

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

const Todo = ({ item, id, removeTodo }) => (
  <div>
    <span>{ item }</span>
    <button onClick={() => removeTodo(id)} type="button">Done</button>
  </div>
)

Todo.propTypes = {
  removeTodo: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default TodoList
