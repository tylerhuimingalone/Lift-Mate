import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import UserHomeContainer from './UserHomeContainer'
import NewWorkoutContainer from './NewWorkoutContainer'
import EditActivitiesContainer from './EditActivitiesContainer'
import WorkoutShowContainer from './WorkoutShowContainer'
import NewExerciseForm from './NewExerciseForm'
import WorkoutIndexContainer from './WorkoutIndexContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserHomeContainer} />
        <Route exact path="/workouts" component={WorkoutIndexContainer} />
        <Route exact path="/workouts/new" component={NewWorkoutContainer} />
        <Route exact path="/workouts/:id" component={WorkoutShowContainer} />
        <Route exact path="/workouts/:id/activities/edit" component={EditActivitiesContainer} />
        <Route exact path="/exercises/new" component={NewExerciseForm} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
