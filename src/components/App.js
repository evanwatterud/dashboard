import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { firebaseAuth } from '../firebase'

import Navigation from './Navigation'
import LandingPage from './Landing'
import SignUpPage from './SignUp'
import SignInPage from './SignIn'
import DashboardPage from './Dashboard'

import * as routes from '../constants/routes'
import '../css/App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { authUser: null }
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((authUser) => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
    })
  }

  render() {
    const { authUser } = this.state

    return (
      <Router>
        <div>
          <Navigation authUser={authUser} />
          <hr />
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} />
          <Route exact path={routes.SIGN_IN} component={SignInPage} />
          <Route exact path={routes.DASHBOARD} component={DashboardPage} />
        </div>
      </Router>
    )
  }
}
export default App
