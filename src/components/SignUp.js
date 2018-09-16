import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import withoutAuthorization from './withoutAuthorization'
import { auth, db } from '../firebase'
import * as routes from '../constants/routes'

const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>
)

SignUpPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  authUser: PropTypes.shape({})
}

SignUpPage.defaultProps = {
  authUser: null
}

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne
    } = this.state

    const { history } = this.props

    // Add the user to Firebase authentication
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        db.doCreateUser(authUser.user.uid, username, email) // Add the user to the database
          .then(() => {
            this.setState({ ...INITIAL_STATE })
            history.push(routes.DASHBOARD)
          })
          .catch((err) => {
            this.setState({ error: err })
          })
      })
      .catch((err) => {
        this.setState({ error: err })
      })

    event.preventDefault()
  }

  handleChange = (key, value) => { this.setState({ [key]: value }) }

  render() {
    const {
      username, email, passwordOne, passwordTwo, error
    } = this.state

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={(event) => { this.handleChange('username', event.target.value) }}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={(event) => { this.handleChange('email', event.target.value) }}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={(event) => { this.handleChange('passwordOne', event.target.value) }}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={(event) => { this.handleChange('passwordTwo', event.target.value) }}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    )
  }
}

SignUpForm.propTypes = {
  history: PropTypes.shape({}).isRequired
}

const SignUpLink = () => (
  <p>
    Don&apos;t have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
)

const isAuth = authUser => !!authUser

export default withoutAuthorization(isAuth)(withRouter(SignUpPage))

export {
  SignUpForm,
  SignUpLink
}
