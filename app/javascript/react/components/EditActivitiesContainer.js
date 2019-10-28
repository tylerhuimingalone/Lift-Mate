import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import ActivityInputTile from './ActivityInputTile'

const EditActivitiesContainer = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [activities, setActivities] = useState([])
  const [shouldRender, setShouldRender] = useState(false)
  const [activityInfo, setActivityInfo] = useState({})

  useEffect(() => {
    fetch(`/api/v1/workouts/${props.match.params.id}/activities`)
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
      setActivities(body.activities)
      let initialObject = {}
      body.activities.forEach(activity => {
        initialObject = {
          ...initialObject,
          [activity.id]: {reps: "", sets: "", weight: "", unit: ""}
        }
      })
      setActivityInfo(initialObject)
      setShouldRender(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  const handleSubmission = event => {
    event.preventDefault()
    fetch("/api/v1/activities", {
      credentials: 'same-origin',
      method: "PATCH",
      body: JSON.stringify({activityInfo}),
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
      setShouldRedirect(`/workouts/${props.match.params.id}`)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const updateActivityInfo = object => {
    setActivityInfo(object)
  }

  let activityInputList = ""

  if (shouldRender) {
    activityInputList = activities.map(activity => {
      return (
        <ActivityInputTile
          key={activity.id}
          id={activity.id}
          exercise={activity.exercise.name}
          activityInfo={activityInfo}
          updateActivityInfo={updateActivityInfo}
        />
      )
    })
  }

  if (shouldRedirect != false) {
    return <Redirect to={shouldRedirect} />
  }

  return (
    <div className="page edit-activities-page">
      <h2 className="page-title">Add Workout Details</h2>
      <div className="grid-x grid-margin-x">
         <h4 className="cell small-4 text-center">Exercises:</h4>
         <h4 className="cell small-2">Reps:</h4>
         <h4 className="cell small-2">Sets:</h4>
         <h4 className="cell small-2">Weight:</h4>
         <h4 className="cell small-2">Units:</h4>
      </div>
      <form onSubmit={handleSubmission}>
        <div>
          {activityInputList}
        </div>
        <div className="actions text-center">
          <button type="submit" name="submit" className="main-action">
            Submit Details
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditActivitiesContainer
