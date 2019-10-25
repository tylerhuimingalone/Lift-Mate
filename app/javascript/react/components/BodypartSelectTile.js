import React from 'react'

const BodypartSelectTile = props => {
  const handleBodypartChange = event => {
    props.updateSelectedBodyparts(event.currentTarget.id)
  }

  return (
    <div>
      <div id="upper body" className="body-image" onClick={handleBodypartChange}>
        <p>Upper Body</p>
      </div>
      <div id="core" className="body-image" onClick={handleBodypartChange}>
        <p>Core</p>
      </div>
      <div id="lower body" className="body-image" onClick={handleBodypartChange}>
        <p>Lower Body</p>
      </div>
    </div>
  )
}

export default BodypartSelectTile
