import React, { useState } from 'react'

const ActivityEditTile = props => {
  const [updatedActivity, setUpdatedActivity] = useState({
    reps: props.reps,
    sets: props.sets,
    weight: props.weight,
    unit: props.unit
  })

  const handleChange = event => {
    setUpdatedActivity({
      ...updatedActivity,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmission = event => {
    event.preventDefault()
    fetch(`/api/v1/activities/${props.id}`, {
      credentials: 'same-origin',
      method: "PATCH",
      body: JSON.stringify(updatedActivity),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {})
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div className="grid-x grid-margin-x activity-edit-tile">
      <div className="cell exercise-name">
        <h4>{props.exerciseName}&nbsp;&nbsp;|&nbsp;&nbsp;</h4>
        <h5 onClick={handleSubmission}>Update Activity</h5>
        <h4>&nbsp;&nbsp;|&nbsp;&nbsp;</h4>
        <h5 onClick={props.handleDeletion}>Delete Activity</h5>
      </div>
      <div className="cell small-3">
        <label className="tile-label">
          Reps
          <input
            className="tile-input"
            type="number"
            name="reps"
            min="0"
            value={updatedActivity.reps}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="cell small-3">
        <label className="tile-label">
          Sets
          <input
            className="tile-input"
            type="number"
            name="sets"
            min="0"
            value={updatedActivity.sets}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="cell small-3">
        <label className="tile-label">
          Weight
          <input
            className="tile-input"
            type="number"
            name="weight"
            min="0"
            value={updatedActivity.weight}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="cell small-3">
        <label className="unit-label tile-label">
          Unit
          <select
            name="unit"
            value={updatedActivity.unit}
            onChange={handleChange}
          >
            <option></option>
            <option>lbs</option>
            <option>kg</option>
          </select>
        </label>
      </div>
      <hr />
    </div>
  )
}

export default ActivityEditTile
