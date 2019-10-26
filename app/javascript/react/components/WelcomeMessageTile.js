import React from 'react'

const WelcomeMessageTile = props => {
  let message = ""
  const day = new Date()
  const hour = day.getHours()
  if (hour < 12) {
    message = "Good Morning"
  } else if (hour < 17) {
    message = "Good Afternoon"
  } else {
    message = "Good Evening"
  }

  return (
    <h2 className="page-title welcome">{message} {props.firstName}</h2>
  )
}

export default WelcomeMessageTile
