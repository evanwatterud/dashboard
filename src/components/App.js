import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navigation from './Navigation'
import '../css/App.css'

const App = () => {
  return (
    <Router>
      <Navigation />
    </Router>
  )
}
export default App
