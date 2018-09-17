import React from 'react'

import withAuthorization from './withAuthorization'
import TodoList from './TodoList'
import WeatherWidget from './WeatherWidget'

const Dashboard = () => (
  <div>
    <h1>Dashboard Page</h1>
    <TodoList />
    <WeatherWidget />
  </div>
)

const isAuth = authUser => !!authUser

export default withAuthorization(isAuth)(Dashboard)
