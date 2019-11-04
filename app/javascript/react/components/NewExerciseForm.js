import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'

import CurrentExerciseList from './CurrentExerciseList'

const NewExerciseForm = props => {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")
  const [exercises, setExercises] = useState([])
  const [shouldRerender, setShouldRerender] = useState(0)
  const [newExercise, setNewExercise] = useState({
    name: "",
    bodypart: ""
  })

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
      setExercises(body.exercises)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[shouldRerender])

  const handleChange = event => {
    setNewExercise({
      ...newExercise,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name", "bodypart"]
    requiredFields.forEach(field => {
      if (newExercise[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return isEmpty(submitErrors)
  }

  const handleFormSubmission = event => {
    event.preventDefault()
    if (validForSubmission()) {
      fetch("/api/v1/exercises", {
        credentials: 'same-origin',
        method: "POST",
        body: JSON.stringify(newExercise),
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
      .then(response =>  response.json())
      .then(body => {
        if (body.exercise) {
          setShouldRerender(shouldRerender + 1)
          setMessage("Exercise Saved")
          setNewExercise({
            name: "",
            bodypart: ""
          })
          setErrors({})
        } else {
          setErrors(body)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  return (
    <div className="page exercise-form-page">
      <h5>{message}</h5>
      <form className="grid-x grid-margin-x" onSubmit={handleFormSubmission}>
        <div className="cell small-12 medium-8">
          <h2 className="page-title">Add An Exercise</h2>
          <div className="grid-x grid-margin-x">
            <label className="cell small-6 name-label">
              Exercise Name: {errors.name}
            </label>
            <label className="cell small-6 bodypart-label">
                Body Part: {errors.bodypart}
            </label>
            <input
              className="cell small-6"
              type="text"
              name="name"
              onChange={handleChange}
              value={newExercise.name}
            />
            <select
              className="first-option-hidden cell small-6"
              value={newExercise.bodypart}
              onChange={handleChange}
              name="bodypart"
            >
              <option></option>
              <option>upper body</option>
              <option>core</option>
              <option>lower body</option>
            </select>
            <div className="cell actions text-center">
              <button type="submit" className="main-action long">
                Add to Database
              </button>
              <h5>
                <Link to='/'>Home</Link>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Link to='/workouts/new'>New Workout</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="cell small-12 medium-4">
          <p>Current Exercises:</p>
          <hr />
          <CurrentExerciseList exercises={exercises} />
        </div>
      </form>
    </div>
  )
}

export default NewExerciseForm
