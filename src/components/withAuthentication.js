import React from 'react'

import AuthUserContext from './AuthUserContext'
import { firebase } from '../firebase'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: null,
        loaded: false
      }
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged((authUser) => {
        authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
        this.setState({ loaded: true })
      })
    }

    render() {
      const { authUser, loaded } = this.state

      return (
        <AuthUserContext.Provider value={authUser}>
          {loaded ? <Component /> : null}
        </AuthUserContext.Provider>
      )
    }
  }

  return WithAuthentication
}

export default withAuthentication
