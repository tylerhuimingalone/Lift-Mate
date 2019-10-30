import React, { useState, useEffect } from 'react'

import EditWorkoutForm from './EditWorkoutForm'

const WorkoutEditContainer = props => {
  const [workoutName, setWorkoutName] = useState("")
  const [message, setMessage] = useState("")

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
      setWorkoutName(body.workout.name)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const updateWorkoutName = string => {
    setWorkoutName(string)
  }

  const handleSubmission = ()=> {
    event.preventDefault()
    fetch(`/api/v1/workouts/${props.match.params.id}`, {
      credentials: 'same-origin',
      method: "PATCH",
      body: JSON.stringify({name: workoutName}),
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
      if (body.workout) {
        setMessage("*saved*")
      } else {
        setMessage(body.name)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div className="page workout-edit-page">
      <h2 className="page-title">Edit Your {workoutName}</h2>
      <EditWorkoutForm
        workoutName={workoutName}
        updateWorkoutName={updateWorkoutName}
        handleSubmission={handleSubmission}
        workoutId={props.match.params.id}
        message={message}
      />
    </div>
  )
}

export default WorkoutEditContainer
