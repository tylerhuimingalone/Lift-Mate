import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import WorkoutDetailTile from './WorkoutDetailTile'

const WorkoutShowContainer = props => {
  const [workout, setWorkout] = useState({
    name: "",
    information: []
  })

  useEffect(() => {
    fetch(`/api/v1/workouts/${props.match.params.id}`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      setWorkout(body.workout)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  let messages = ""
  if (props.match.path.includes("review")) {
    messages = (
      <div className="cell">
        <div className="text-center cell message">
          <h5><Link to="/workouts">Workouts</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to={`/workouts/${props.match.params.id}/edit`}>Edit</Link>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <Link to="/">Home</Link></h5>
        </div>
      </div>
    )
  } else {
    messages = (
      <div className="cell">
        <h3 className="text-center cell message">Enjoy Your Workout!</h3>
        <div className="text-center cell message">
          <h5>Finished your {workout.name}? <Link to="/">Home</Link></h5>
        </div>
      </div>
    )
  }

  const workoutDetails = workout.information.map(info => {
    return (
      <WorkoutDetailTile
        key={info.name}
        name={info.name}
        reps={info.reps}
        sets={info.sets}
        weight={info.weight}
        unit={info.unit}
      />
    )
  })

  return (
    <div className="page workout-show-page grid-x grid-margin-x">
      <h1 className="page-title cell">{workout.name}</h1>
      {workoutDetails}
      {messages}
    </div>
  )
}

export default WorkoutShowContainer
