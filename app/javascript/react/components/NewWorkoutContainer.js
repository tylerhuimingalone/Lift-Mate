import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import NewWorkoutForm from './NewWorkoutForm'

const NewWorkoutContainer = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [exerciseNumber, setExerciseNumber] = useState(0)
  const [exerciseList, setExerciseList] = useState([])
  const [selectedBodyparts, setSelectedBodyparts]  = useState([])
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    exercises: {}
  })

  useEffect(() => {fetch("/api/v1/exercises")
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

  const prepareWorkoutData = () => {
    let exerciseArray = []
    const exerciseObject = newWorkout.exercises
    Object.keys(exerciseObject).forEach(key => {
      if (key + 1 < exerciseNumber) {
        exerciseArray.push(exerciseObject[key])
      }
    })
    return ({
      ...newWorkout,
      exercises: exerciseArray
    })
  }

  const handleFormSubmission = () => {
    event.preventDefault()
    let workoutPayload = prepareWorkoutData()
    fetch("/api/v1/workouts", {
      credentials: 'same-origin',
      method: "POST",
      body: JSON.stringify(workoutPayload),
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

  const updateExerciseNumber = number => {
    setExerciseNumber(number)
  }

  const updateNewWorkout = workoutObject => {
    setNewWorkout(workoutObject)
  }

  const updateSelectedBodyparts = bodypart => {
    if (selectedBodyparts.includes(bodypart)) {
      const newPartsArray = selectedBodyparts.filter(part => part != bodypart)
      setSelectedBodyparts(newPartsArray)
      const removedExerciseObjects = exerciseList.filter(exercise => exercise.bodypart === bodypart)
      const removedExercises = removedExerciseObjects.map(exercise => exercise.name)
      const oldExerciseObject = newWorkout.exercises
      let newExerciseObject = {}

      Object.keys(oldExerciseObject).forEach(key => {
        if (removedExercises.includes(oldExerciseObject[key])) {
          newExerciseObject = {
            ...newExerciseObject,
            [key]: ""
          }
        } else {
          newExerciseObject = {
            ...newExerciseObject,
            [key]: oldExerciseObject[key]
          }
        }
      })
      setNewWorkout({
        ...newWorkout,
        exercises: newExerciseObject
      })
    } else {
      setSelectedBodyparts(selectedBodyparts.concat(bodypart))
    }
  }

  if (shouldRedirect) {
    return <Redirect to="/" />
  }

  return (
    <div className="page new-workout-page">
      <h2 className="page-title">Build Your Workout</h2>
      <NewWorkoutForm
        updateExerciseNumber={updateExerciseNumber}
        exerciseNumber={exerciseNumber}
        exerciseList={exerciseList}
        updateNewWorkout={updateNewWorkout}
        newWorkout={newWorkout}
        updateSelectedBodyparts={updateSelectedBodyparts}
        selectedBodyparts={selectedBodyparts}
        handleFormSubmission={handleFormSubmission}
      />
    </div>
  )
}

export default NewWorkoutContainer
