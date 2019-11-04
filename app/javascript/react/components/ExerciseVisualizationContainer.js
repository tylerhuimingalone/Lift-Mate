import React, { useState, useEffect } from 'react'

import LineChart from './LineChart'

const ExerciseVisualizationContainer = props => {
  const [exerciseList, setExerciseList] = useState([])
  const [selectedExercise, setSelectedExercise] = useState("")
  const [selectedComparison, setSelectedComparison] = useState("Weight")
  const [dataSet, setDataSet] = useState([])

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

  useEffect(() => {
    if (selectedExercise != "") {
      fetch(`/api/v1/exercises/${selectedExercise}/activities/${selectedComparison}`)
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
        setDataSet(body)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }, [selectedExercise, selectedComparison])

  const options = exerciseList.map((exercise) => {
    return (
      <option key={exercise.id}>{exercise.name}</option>
    )
  })

  const handleChange = event => {
    setSelectedExercise(event.currentTarget.value)
  }

  const handleComparisonChange = event => {
    setSelectedComparison(event.currentTarget.value)
  }

  let chart = <h3>No Data Points Available</h3>

  if (selectedExercise != "" && dataSet.length > 1) {
    chart = (
      <LineChart
        data={dataSet}
        selectedExercise={selectedExercise}
      />
    )
  }

  return (
    <div className="page exercise-visualization-page">
      <h2 className="page-title">See Your Progress</h2>
      <div className="exercise-select grid-x grid-margin-x">
        <div className="cell small-6">
          <label>
            Exercise:
          </label>
          <select
            className="first-option-hidden"
            onChange={handleChange}
            value={selectedExercise}
            >
            <option></option>
            {options}
          </select>
        </div>
        <div className="cell small-6">
          <label>
            Compare by:
          </label>
          <select
            onChange={handleComparisonChange}
            value={selectedComparison}
            >
            <option>Weight</option>
            <option>Sets</option>
            <option>Reps per Set</option>
            <option>Total Reps</option>
          </select>
        </div>
      </div>
      <hr />
      {chart}
    </div>
  )
}

export default ExerciseVisualizationContainer
