import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import SignOutButton from './SignOut'
import AuthUserContext from './AuthUserContext'
import * as routes from '../constants/routes'

const NavigationAuth = () => (
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.DASHBOARD}>Dashboard</Link></li>
    <li><SignOutButton /></li>
  </ul>
)

const NavigationNonAuth = () => (
  <ul>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    <li><Link to={routes.LANDING}>Landing</Link></li>
  </ul>
)

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
  </AuthUserContext.Consumer>
)

Navigation.propTypes = {
  authUser: PropTypes.shape({})
}

Navigation.defaultProps = {
  authUser: null
}

export default Navigation
