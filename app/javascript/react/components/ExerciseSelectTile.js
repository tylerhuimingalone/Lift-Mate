import React from 'react'

const ExerciseSelectTile = props => {
  const handleWorkoutExerciseChange = event => {
    props.updateNewWorkout({
      name: props.newWorkout.name,
      exercises: {
        ...props.newWorkout.exercises,
        [event.currentTarget.name]: event.currentTarget.value
      }
    })
  }

  const exerciseList = props.exerciseList
  const options = exerciseList.map((exercise) => {
    return (
      <option key={exercise.id}>{exercise.name}</option>
    )
  })

  return (
    <select
      name={props.id}
      className="first-option-hidden"
      onChange={handleWorkoutExerciseChange}
      value={props.newWorkout.exercises[props.id]}
    >
      <option></option>
      {options}
    </select>
  )
}

export default ExerciseSelectTile
