import React, { useState, useEffect} from 'react'

import ImageUploader from './ImageUploader'

const UserTweetForm = props => {

  return (
    <div className="page tweet-page grid-x grid-margin-x">
      <h2 className="page-title cell">Send Tweet</h2>
      <div className="cell small-12 medium-6">
        <ImageUploader />
      </div>
    </div>
  )
}

export default UserTweetForm
