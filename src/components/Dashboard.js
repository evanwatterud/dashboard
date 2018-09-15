import React from 'react'

import withAuthorization from './withAuthorization'

const Dashboard = () => (
  <div>
    <h1>Dashboard Page</h1>
  </div>
)

const isAuth = authUser => !!authUser

export default withAuthorization(isAuth)(Dashboard)
