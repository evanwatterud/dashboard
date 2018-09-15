import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthUserContext from './AuthUserContext'
import { firebaseAuth } from '../firebase'
import * as routes from '../constants/routes'

const withAuthorization = isAuth => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebaseAuth.onAuthStateChanged((authUser) => {
        const { history } = this.props

        if (!isAuth(authUser)) {
          history.push(routes.LANDING)
        }
      })
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component /> : null}
        </AuthUserContext.Consumer>
      )
    }
  }

  WithAuthorization.propTypes = {
    history: PropTypes.shape({}).isRequired
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
