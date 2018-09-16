import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthUserContext from './AuthUserContext'
import { firebase } from '../firebase'
import * as routes from '../constants/routes'

const withoutAuthorization = isAuth => (Component) => {
  class WithoutAuthorization extends React.Component {
    componentWillMount() {
      firebase.auth.onAuthStateChanged((authUser) => {
        const { history } = this.props

        if (isAuth(authUser)) {
          history.push(routes.DASHBOARD)
        }
      })
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => !isAuth(authUser) ? <Component /> : null}
        </AuthUserContext.Consumer>
      )
    }
  }

  WithoutAuthorization.propTypes = {
    history: PropTypes.shape({}).isRequired
  }

  return withRouter(WithoutAuthorization)
}

export default withoutAuthorization
