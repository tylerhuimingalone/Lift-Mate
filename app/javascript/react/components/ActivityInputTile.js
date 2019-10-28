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
    <div className="grid-x grid-margin-x">
      <h3 className="cell small-4 text-center">{props.exercise}</h3>
      <div className="cell small-2 reps">
        <input
          name="reps"
          type="number"
          min="0"
          onChange={handleInputChange}
          value={props.activityInfo[props.id].reps}
        />
      </div>

      <div className="cell small-2 sets">
        <input
          name="sets"
          type="number"
          min="0"
          onChange={handleInputChange}
          value={props.activityInfo[props.id].sets}
        />
      </div>

      <div className="cell small-2 weight">
        <input
          name="weight"
          type="number"
          min="0"
          onChange={handleInputChange}
          value={props.activityInfo[props.id].weight}
        />
      </div>

      <div className="cell small-2 unit">
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
