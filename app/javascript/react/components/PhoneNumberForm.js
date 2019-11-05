import React, { useState, useEffect } from 'react'

const PhoneNumberForm = props => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userId, setUserId] = useState(null)

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
      setUserId(body.user.id)
      if (body.user.phone_number) {
        setPhoneNumber(body.user.phone_number)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const handleChange = event => {
    setPhoneNumber(event.currentTarget.value)
  }

  const handleSubmission = () => {
    event.preventDefault()
    fetch(`/api/v1/users/${userId}`, {
      credentials: 'same-origin',
      method: "PATCH",
      body: JSON.stringify({phone_number: phoneNumber}),
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
      if (body.user) {
        setPhoneNumber("Number Saved")
      } else {
        setPhoneNumber(body)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div className="text-center">
      <h5>Add or Update your Phone Number</h5>
      <form onSubmit={handleSubmission}>
        <input type="text" value={phoneNumber} onChange={handleChange} />
        <button className="main-action" type="submit">Update</button>
      </form>
    </div>
  )
}

export default PhoneNumberForm
