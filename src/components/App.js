import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Navigation from './Navigation'
import LandingPage from './Landing'
import SignUpPage from './SignUp'
import SignInPage from './SignIn'
import DashboardPage from './Dashboard'

import * as routes from '../constants/routes'
import '../css/App.css'

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <hr />
        <Route
          exact
          path={routes.LANDING}
          component={LandingPage}
        />
        <Route
          exact
          path={routes.SIGN_UP}
          component={SignUpPage}
        />
        <Route
          exact
          path={routes.SIGN_IN}
          component={SignInPage}
        />
        <Route
          exact
          path={routes.DASHBOARD}
          component={DashboardPage}
        />
      </div>
    </Router>
  )
}
export default App
