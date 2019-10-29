import React from 'react'

const CurrentExerciseList = props => {
  const exerciseListItems = props.exercises.map(exercise => {
    return (
      <li key={exercise.id}>{exercise.name}</li>
    )
  })

  return (
    <div className="exercise-list">
      <ul>
        {exerciseListItems}
      </ul>
    </div>
  )
}

export default CurrentExerciseList
