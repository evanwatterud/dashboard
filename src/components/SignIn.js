import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { SignUpLink } from './SignUp'
import { PasswordForgetLink } from './PasswordForget'
import { auth } from '../firebase'
import * as routes from '../constants/routes'

const SignInPage = ({ history }) => (
  <div>
    <h1>Sign In Page</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
)

SignInPage.propTypes = {
  history: PropTypes.shape({}).isRequired
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const { email, password } = this.state

    const { history } = this.props

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        history.push(routes.DASHBOARD)
      })
      .catch((err) => {
        this.setState({ error: err })
      })

    event.preventDefault()
  }

  handleChange = (key, value) => { this.setState({ [key]: value }) }

  render() {
    const { email, password, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={(event) => { this.handleChange('email', event.target.value) }}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={(event) => { this.handleChange('password', event.target.value) }}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    )
  }
}

SignInForm.propTypes = {
  history: PropTypes.shape({}).isRequired
}

export default withRouter(SignInPage)

export {
  SignInForm
}
