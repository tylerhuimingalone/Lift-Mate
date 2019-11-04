import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'

import EditWorkoutForm from './EditWorkoutForm'

const WorkoutEditContainer = props => {
  const [workoutName, setWorkoutName] = useState("")
  const [message, setMessage] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)

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
  }, [])

  const updateWorkoutName = string => {
    setWorkoutName(string)
  }

  const handleSubmission = ()=> {
    event.preventDefault()
    if (workoutName === "") {
      setMessage("can't be blank")
    } else {
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
          setMessage("")
        } else {
          setMessage(body.name)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  const workoutDestruction = () => {
    fetch(`/api/v1/workouts/${props.match.params.id}`, {
      credentials: 'same-origin',
      method: "DELETE",
      body: JSON.stringify({}),
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
      setShouldRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (shouldRedirect) {
    return <Redirect to='/workouts' />
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
        workoutDestruction={workoutDestruction}
      />
    <h5 className="link-home">
        <Link className="cell" to={`/workouts/${props.match.params.id}/review`}>
            Back to Workout
        </Link>
      </h5>
    </div>
  )
}

export default WorkoutEditContainer
