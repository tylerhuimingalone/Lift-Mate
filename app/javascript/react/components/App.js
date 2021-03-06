import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import UserHomeContainer from './UserHomeContainer'
import NewWorkoutContainer from './NewWorkoutContainer'
import EditActivitiesContainer from './EditActivitiesContainer'
import WorkoutShowContainer from './WorkoutShowContainer'
import NewExerciseForm from './NewExerciseForm'
import WorkoutIndexContainer from './WorkoutIndexContainer'
import WorkoutEditContainer from './WorkoutEditContainer'
import NewAppointmentContainer  from './NewAppointmentContainer'
import ExerciseVisualizationContainer from './ExerciseVisualizationContainer'
import UserTweetForm from './UserTweetForm'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserHomeContainer} />
        <Route exact path="/workouts" component={WorkoutIndexContainer} />
        <Route exact path="/workouts/new" component={NewWorkoutContainer} />
        <Route exact path="/workouts/:id" component={WorkoutShowContainer} />
        <Route exact path="/workouts/:id/review" component={WorkoutShowContainer} />
        <Route exact path="/workouts/:id/edit" component={WorkoutEditContainer} />
        <Route exact path="/workouts/:id/activities/edit" component={EditActivitiesContainer} />
        <Route exact path="/workouts/:id/tweet" component={UserTweetForm} />
        <Route exact path="/exercises" component={ExerciseVisualizationContainer} />
        <Route exact path="/exercises/new" component={NewExerciseForm} />
        <Route exact path="/appointments/new" component={NewAppointmentContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
