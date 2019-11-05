import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import DatePicker from "react-datepicker";

const AppointmentForm = props => {
  const [errors, setErrors] = useState("")
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [textDate, setTextDate] = useState(new Date())

  const handleSubmission = () => {
    event.preventDefault()
    fetch("/api/v1/appointments", {
      credentials: 'same-origin',
      method: "POST",
      body: JSON.stringify({time: textDate}),
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
      if (body.id) {
        setShouldRedirect(true)
      } else {
        setErrors(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (shouldRedirect) {
    return <Redirect to="/" />
  }

  return(
    <div className="text-center appointment-form">
      <form onSubmit={handleSubmission}>
        <h5>Set Reminder Date and Time {errors}</h5>
          <DatePicker
            name="textDate"
            selected={textDate}
            onChange={date => setTextDate(date)}
            placeholderText="mm-dd-yyyy"
            minDate={new Date()}
            showTimeSelect
            dateFormat="Pp"
          />
        <button type="submit" className="main-action">Set Reminder</button>
      </form>
    </div>
  )
}

export default AppointmentForm
