import React from 'react'
import { capitalize } from 'lodash'

const WorkoutDetailTile = props => {
  let repsMessage = ""
  if (props.reps) {
    repsMessage = <li><h5 className="reps">{props.reps} Reps</h5></li>
  }

  let setsMessage = ""
  if (props.sets) {
    setsMessage = <li><h5 className="sets">{props.sets} Sets</h5></li>
  }

  let weightMessage = ""
  if (props.weight) {
    weightMessage = <li><h5 className="weight">{props.weight} {props.unit}</h5></li>
  }

  const name = capitalize(props.name)
  return (
    <div className="cell small-6 medium-4 large-3 text-center">
      <h3>{name}</h3>
      <hr />
      <ul>
        {repsMessage}
        {setsMessage}
        {weightMessage}
      </ul>
    </div>
  )
}

export default WorkoutDetailTile
