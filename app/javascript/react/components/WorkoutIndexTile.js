import React from 'react'
import { Link } from 'react-router-dom'

const WorkoutIndexTile = props => {
  const routePath = `/workouts/${props.id}/review`

  return (
    <div className="workout-tile">
      <Link to={routePath} className="grid-x grid-margin-x">
        <div className="cell small-6 medium-4"><h5>{props.date}</h5></div>
        <div className="cell small-6 medium-4"><h3>{props.name}</h3></div>
        <div className="cell small-12 medium-4">
          <h4>Exercises: {props.numberOfActivities}</h4>
        </div>
      </Link>
    </div>
  )
}

export default WorkoutIndexTile
