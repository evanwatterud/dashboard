import React from 'react'
import PropTypes from 'prop-types'

class TodoForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { todoItem: '' }
  }

  handleChange = (key, value) => { this.setState({ [key]: value }) }

  render() {
    const { todoItem } = this.state
    const { error, onSubmit } = this.props
    const isInvalid = todoItem === ''

    return (
      <form onSubmit={event => onSubmit(event, todoItem)}>
        <input
          value={todoItem}
          onChange={(event) => { this.handleChange('todoItem', event.target.value) }}
          type="text"
          placeholder="To do"
        />
        <button disabled={isInvalid} type="submit">Add</button>

        { error && <p>{error.message}</p> }
      </form>
    )
  }
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({})
}

TodoForm.defaultProps = {
  error: null
}

export default TodoForm
