import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import UserHomeContainer from './UserHomeContainer'
import NewWorkoutContainer from './NewWorkoutContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserHomeContainer} />
        <Route exact path="/workouts/new" component={NewWorkoutContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
