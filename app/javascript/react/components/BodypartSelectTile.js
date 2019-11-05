import React, { useState, useEffect } from 'react'

const BodypartSelectTile = props => {
  const [selectedView, setSelectedView] = useState("")

  useEffect(() => {
    fetch("/api/v1/users/gender")
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
      setSelectedView(body.view)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const handleClick = event => {
    fetch("/api/v1/users/gender", {
      credentials: 'same-origin',
      method: "PATCH",
      body: JSON.stringify({user: {gender_preference: event.currentTarget.id}}),
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
      setSelectedView(body.view)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleBodypartChange = event => {
    props.updateSelectedBodyparts(event.currentTarget.id)
  }

  let topClass = "body-image top"
  let middleClass = "body-image middle"
  let bottomClass = "body-image bottom"
  if (props.selectedBodyparts.includes("upper body")) {
    topClass += " selected"
  }
  if (props.selectedBodyparts.includes("core")) {
    middleClass += " selected"
  }
  if (props.selectedBodyparts.includes("lower body")) {
    bottomClass += " selected"
  }

  return (
    <>
      <div className={`body-image-container ${selectedView}`}>
        <div id="upper body" className={topClass} onClick={handleBodypartChange}>
          <p>Upper Body</p>
        </div>
        <div id="core" className={middleClass} onClick={handleBodypartChange}>
          <p>Core</p>
        </div>
        <div id="lower body" className={bottomClass} onClick={handleBodypartChange}>
          <p>Lower Body</p>
        </div>
      </div>
      <div className="male-female">
        <h4 className="button" id="female" onClick={handleClick}>Female</h4>
        <h4 className="button" id="male" onClick={handleClick}>Male</h4>
      </div>
    </>
  )
}

export default BodypartSelectTile
