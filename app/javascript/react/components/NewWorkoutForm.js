import React from 'react'

import ExerciseSelectTile from './ExerciseSelectTile'
import BodypartSelectTile from './BodypartSelectTile'

const NewWorkoutForm = props => {
  const handleExerciseNumberChange = event => {
    props.updateExerciseNumber(event.currentTarget.value)
  }

  const handleWorkoutNameChange = event => {
    props.updateNewWorkout({
      ...props.newWorkout,
      name: event.currentTarget.value
    })
  }

  let filteredExercises = []
  const filterExercises = () => {
    filteredExercises = props.exerciseList.filter((exercise) => {
      return (props.selectedBodyparts.includes(exercise.bodypart))
    })
  }

  let exerciseSelects = []
  for (let num = 0; num < props.exerciseNumber; num++) {
    filterExercises()
    exerciseSelects.push(
      <ExerciseSelectTile
        key={num}
        id={num}
        exerciseList={filteredExercises}
        updateNewWorkout={props.updateNewWorkout}
        newWorkout={props.newWorkout}
      />
    )
  }

  return (
    <form>
      <div className="grid-x grid-margin-x">
        <div className="cell small-12 medium-6">
          <label>
            Workout Name
            <input
              type="text"
              name="name"
              value={props.newWorkout.name}
              onChange={handleWorkoutNameChange}
            />
          </label>
        </div>
        <div className="cell small-12 medium-6">
          <label>
            Number of Exercises
            <input
              type="number"
              min="1"
              value={props.exerciseNumber}
              onChange={handleExerciseNumberChange}
            />
          </label>
        </div>
        <div className="cell small-12 medium-6 bodypart-list" >
          <label  className="exercises-label">
            Area(s) of Focus:
            <BodypartSelectTile
              selectedBodyparts={props.selectedBodyparts}
              updateSelectedBodyparts={props.updateSelectedBodyparts}
            />
          </label>
        </div>
        <div className="cell small-12 medium-6 exercise-list">
          <label className="exercises-label">
            Exercises:
            {exerciseSelects}
          </label>
        </div>
      </div>
    </form>
  )
}

export default NewWorkoutForm
