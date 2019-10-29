import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import WorkoutIndexTile from './WorkoutIndexTile'

const WorkoutIndexContainer = props => {
  const [workoutList, setWorkoutList] = useState([])

  useEffect(() => {
    fetch("/api/v1/workouts")
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
      setWorkoutList(body.workouts)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  let workoutTiles = ""

  if (workoutList.length > 0) {
    workoutTiles = workoutList.map(workout => {
      return (
        <WorkoutIndexTile
          key={workout.id}
          id={workout.id}
          name={workout.name}
          numberOfActivities={workout.information.length}
          date={workout.created}
        />
      )
    })
  }

  return (
    <div className="page workout-index-page grid-x text-center">
      <h2 className="page-title cell">Recorded Workouts</h2>
      <hr id="index-hr" />
      <div className="cell">
        {workoutTiles}
      </div>
      <p className="cell"><Link to='/'>Home</Link></p>
    </div>
  )
}

export default WorkoutIndexContainer
