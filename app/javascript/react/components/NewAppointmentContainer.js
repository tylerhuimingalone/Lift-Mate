import React from 'react'

import PhoneNumberForm from './PhoneNumberForm'
import AppointmentForm from './AppointmentForm'

const NewAppointmentContainer = props => {
  return (
    <div className="page appointment-page grid-x grid-margin-x">
      <h2 className="page-title cell">Set Text Message Reminder</h2>
      <div className="cell small-6">
        <PhoneNumberForm />
      </div>
      <div className="cell small-6">
        <AppointmentForm />
      </div>
    </div>
  )
}

export default NewAppointmentContainer
