import React, { useState, useEffect } from 'react'

import ActivityEditTile from './ActivityEditTile'
import AddActivityTile from './AddActivityTile'

const ActivityFormContainer = props => {
  const [activityList, setActivityList] = useState([])
  const [shouldRerender, setShouldRerender] = useState(0)

  useEffect(() => {
    fetch(`/api/v1/workouts/${props.workoutId}/activities`)
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
      setActivityList(body.activities)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [shouldRerender])

  const submitDeletion = id => {
    fetch(`/api/v1/activities/${id}`, {
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
      setShouldRerender(shouldRerender + 1)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const activityEditTiles = activityList.map(activity => {
    if (activity.reps === null) {activity.reps = ""}
    if (activity.sets === null) {activity.sets = ""}
    if (activity.weight === null) {activity.weight = ""}
    if (activity.unit === null) {activity.unit = ""}

    const handleDeletion = () => {
      submitDeletion(activity.id)
    }

    return (
      <ActivityEditTile
        key={activity.id}
        id={activity.id}
        exerciseName={activity.exercise.name}
        reps={activity.reps}
        sets={activity.sets}
        weight={activity.weight}
        unit={activity.unit}
        handleDeletion={handleDeletion}
      />
    )
  })

  const forceRerender = () => {
    setShouldRerender(shouldRerender + 1)
  }

  return (
    <div>
      {activityEditTiles}
      <AddActivityTile
        workoutId={props.workoutId}
        forceRerender={forceRerender}
      />
    </div>
  )
}

export default ActivityFormContainer
