import React from 'react'

import withAuthorization from './withAuthorization'
import TodoList from './TodoList'

const Dashboard = () => (
  <div>
    <h1>Dashboard Page</h1>
    <TodoList />
  </div>
)

const isAuth = authUser => !!authUser

export default withAuthorization(isAuth)(Dashboard)
