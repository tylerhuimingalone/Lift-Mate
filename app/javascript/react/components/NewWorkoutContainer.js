import React, { useState, useEffect } from 'react'

import NewWorkoutForm from './NewWorkoutForm'

const NewWorkoutContainer = props => {
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
      setExerciseList(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

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
    } else {
      setSelectedBodyparts(selectedBodyparts.concat(bodypart))
    }
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
      />
    </div>
  )
}

export default NewWorkoutContainer
