import React from 'react'

const ActivityInputTile = props => {
  const handleInputChange = event => {
    props.updateActivityInfo({
      ...props.activityInfo,
      [props.id]: {
        ...props.activityInfo[props.id],
        [event.currentTarget.name]: event.currentTarget.value
      }
    })
  }

  return (
    <div className="five-item-flex-container">
      <h4 className="flex-item">{props.exercise}</h4>
      <div className="flex-item reps">
        <input
          name="reps"
          type="number"
          min="0"
          onChange={handleInputChange}
          value={props.activityInfo[props.id].reps}
        />
      </div>

      <div className="flex-item sets">
        <input
          name="sets"
          type="number"
          min="0"
          onChange={handleInputChange}
          value={props.activityInfo[props.id].sets}
        />
      </div>

      <div className="flex-item weight">
        <input
          name="weight"
          type="number"
          min="0"
          onChange={handleInputChange}
          value={props.activityInfo[props.id].weight}
        />
      </div>

      <div className="flex-item unit">
        <select
          name="unit"
          onChange={handleInputChange}
          value={props.activityInfo[props.id].unit}
        >
          <option></option>
          <option>lbs</option>
          <option>kg</option>
        </select>
      </div>
    </div>
  )
}

export default ActivityInputTile
