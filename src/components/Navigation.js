import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import SignOutButton from './SignOut'
import * as routes from '../constants/routes'

const NavigationAuth = () => {
  return (
    <ul>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.DASHBOARD}>Dashboard</Link></li>
      <li><SignOutButton /></li>
    </ul>
  )
}

const NavigationNonAuth = () => {
  return (
    <ul>
      <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
      <li><Link to={routes.LANDING}>Landing</Link></li>
    </ul>
  )
}

const Navigation = ({ authUser }) => {
  return (
    <div>
      { authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
    </div>
  )
}

Navigation.propTypes = {
  authUser: PropTypes.shape({})
}

Navigation.defaultProps = {
  authUser: null
}

export default Navigation
