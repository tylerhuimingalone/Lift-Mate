import React from 'react'

import ActivityFormContainer from './ActivityFormContainer'

const EditWorkoutForm = props => {
  const handleNameChange = event => {
    props.updateWorkoutName(event.currentTarget.value)
  }

  return (
    <div>
      <div className="grid-x grid-margin-x">
        <div className="cell small-12">
          <label id="workout-name">Workout Name&nbsp;{props.message}&nbsp;|&nbsp;&nbsp;
            <h5 onClick={props.handleSubmission}>Update Name</h5>
            <h5 className="vertical-line">&nbsp;&nbsp;|&nbsp;&nbsp;</h5>
            <h5 onClick={props.workoutDestruction}>Delete Workout</h5>
            <input
              type="text"
              name="name"
              value={props.workoutName}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div className="cell small-12 exercise-list">
          <label>Exercise Details:</label>
          <hr />
          <ActivityFormContainer
            workoutId={props.workoutId}
          />
        </div>
      </div>
    </div>
  )
}

export default EditWorkoutForm
