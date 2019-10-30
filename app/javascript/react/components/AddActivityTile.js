import React, { useState, useEffect } from 'react'

const AddActivityTile = props => {
  const [exerciseList, setExerciseList] = useState([])
  const [selectedExercise, setSelectedExercise] = useState("")
  const [errors, setErrors] = useState("")

  useEffect(() => {
    fetch("/api/v1/exercises")
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
      setExerciseList(body.exercises)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const options = exerciseList.map((exercise) => {
    return (
      <option key={exercise.id}>{exercise.name}</option>
    )
  })

  const handleChange = event => {
    setSelectedExercise(event.currentTarget.value)
  }

  const handleSubmission = ()=> {
    event.preventDefault()
    if (selectedExercise === "") {
      setErrors("Can't be blank")
    } else {
      fetch(`/api/v1/workouts/${props.workoutId}/activities`, {
        credentials: 'same-origin',
        method: "POST",
        body: JSON.stringify({exercise: selectedExercise}),
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
      .then(body => {
        if (body.activity) {
          props.forceRerender()
        } else {
          setErrors(body)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  return (
    <div className="add-activity-tile">
      {errors}
      <form className="grid-x grid-margin-x" onSubmit={handleSubmission}>
        <label className="cell small-4" id="add-activity-label">
          Add Activity:
        </label>
        <select
          className="first-option-hidden cell small-4"
          value={selectedExercise}
          onChange={handleChange}
        >
          <option></option>
          {options}
        </select>
        <button type="submit" className="main-action cell small-4">
          Add Exercise
        </button>
      </form>
    </div>
  )
}

export default AddActivityTile
