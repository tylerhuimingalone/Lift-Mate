import React from 'react'

const BodypartSelectTile = props => {
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
    <div className="body-image-container">
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
  )
}

export default BodypartSelectTile
