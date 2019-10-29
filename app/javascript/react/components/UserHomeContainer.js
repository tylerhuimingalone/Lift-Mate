import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import WelcomeMessageTile from './WelcomeMessageTile'

const UserHomeContainer = props => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
  })

  useEffect(() => {
    fetch("/api/v1/users")
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
      setUserInfo({
        firstName: body.user.first_name,
        lastName: body.user.last_name
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  },[])

  return (
    <div className="user-page page text-center">
      <WelcomeMessageTile firstName={userInfo.firstName} />
      <Link to="/workouts/new" className="button main-call-out long">Log New Workout</Link>
      <div className="grid-x grid-margin-x">
        <h5 className="cell small-4"><Link to="/exercises/new">Add Exercise</Link></h5>
        <h5 className="cell small-4"><Link to="/workouts">View Workouts</Link></h5>
      </div>
    </div>
  )
}

export default UserHomeContainer
